#!/usr/bin/env python3
"""
Flask 서버 - Spark-TTS 모델 연동
사용자 음성 업로드, 학습, TTS 생성 API 제공
"""

import os
import logging
import tempfile
import shutil
from pathlib import Path
from datetime import datetime
from typing import Optional
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import torch
import soundfile as sf

# Spark-TTS 모델 import
from cli.SparkTTS import SparkTTS
from sparktts.utils.token_parser import LEVELS_MAP_UI

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# 전역 변수
model = None
UPLOAD_FOLDER = Path("user_prompts")
RESULTS_FOLDER = Path("generated_audio")
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'm4a', 'flac', 'aiff', 'aif'}

# 폴더 생성
UPLOAD_FOLDER.mkdir(exist_ok=True)
RESULTS_FOLDER.mkdir(exist_ok=True)

def allowed_file(filename):
    """허용된 파일 확장자 확인"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def initialize_model():
    """Spark-TTS 모델 초기화"""
    global model
    try:
        model_dir = Path("pretrained_models/Spark-TTS-0.5B")
        if not model_dir.exists():
            logger.error(f"Model directory not found: {model_dir}")
            return False
        
        # 디바이스 설정
        if torch.cuda.is_available():
            device = torch.device("cuda:0")
            logger.info("Using CUDA device")
        elif hasattr(torch.backends, 'mps') and torch.backends.mps.is_available():
            device = torch.device("mps")
            logger.info("Using MPS device")
        else:
            device = torch.device("cpu")
            logger.info("Using CPU device")
        
        model = SparkTTS(model_dir, device)
        logger.info("Spark-TTS model initialized successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to initialize model: {e}")
        return False

@app.route('/health', methods=['GET'])
def health_check():
    """서버 상태 확인"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/upload-prompt', methods=['POST'])
def upload_prompt():
    """사용자 음성 프롬프트 업로드"""
    try:
        user_id = request.form.get('user_id')
        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400
        
        if 'prompt_speech' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400
        
        file = request.files['prompt_speech']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # 사용자별 폴더 생성
        user_folder = UPLOAD_FOLDER / user_id
        user_folder.mkdir(exist_ok=True)
        
        # 파일 저장
        filename = secure_filename(file.filename or "audio.wav")
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        safe_filename = f"{timestamp}_{filename}"
        file_path = user_folder / safe_filename
        
        file.save(file_path)
        
        # 음성 파일 검증 (길이, 품질 등)
        try:
            # M4A 파일의 경우 pydub으로 WAV로 변환
            if file_path.suffix.lower() in ['.m4a', '.aac']:
                try:
                    from pydub import AudioSegment
                    
                    # M4A를 WAV로 변환
                    audio = AudioSegment.from_file(file_path)
                    wav_path = file_path.with_suffix('.wav')
                    audio.export(wav_path, format="wav")
                    
                    # 원본 M4A 파일 삭제
                    file_path.unlink()
                    file_path = wav_path
                    safe_filename = wav_path.name
                    
                    logger.info(f"Converted M4A to WAV: {safe_filename}")
                    
                except ImportError:
                    return jsonify({'error': 'M4A support not available. Please install pydub and ffmpeg.'}), 400
                except Exception as e:
                    logger.error(f"M4A conversion failed: {e}")
                    return jsonify({'error': 'Failed to convert M4A file'}), 400
            
            # soundfile로 오디오 읽기
            audio_data, sample_rate = sf.read(file_path)
            duration = len(audio_data) / sample_rate
            
            if duration < 10:  # 최소 10초
                return jsonify({
                    'error': 'Audio file must be at least 10 seconds long',
                    'duration': duration
                }), 400
            
            logger.info(f"Audio uploaded for user {user_id}: {duration:.2f}s, {sample_rate}Hz")
            
        except Exception as e:
            logger.error(f"Audio validation failed: {e}")
            return jsonify({'error': 'Invalid audio file'}), 400
        
        return jsonify({
            'success': True,
            'message': 'Audio uploaded successfully',
            'user_id': user_id,
            'filename': safe_filename,
            'duration': duration,
            'sample_rate': sample_rate
        })
        
    except Exception as e:
        logger.error(f"Upload error: {e}")
        return jsonify({'error': 'Upload failed'}), 500

@app.route('/voice-clone', methods=['POST'])
def voice_clone():
    """음성 복제 TTS 생성"""
    try:
        if model is None:
            return jsonify({'error': 'Model not initialized'}), 500
        
        user_id = request.form.get('user_id')
        text = request.form.get('text')
        prompt_text = request.form.get('prompt_text', '')
        
        if not user_id or not text:
            return jsonify({'error': 'user_id and text are required'}), 400
        
        # 사용자 음성 프롬프트 파일 찾기
        user_folder = UPLOAD_FOLDER / user_id
        if not user_folder.exists():
            return jsonify({'error': 'No voice model found for user'}), 404
        
        # 가장 최근 업로드된 파일 사용
        prompt_files = list(user_folder.glob('*.wav')) + list(user_folder.glob('*.mp3'))
        if not prompt_files:
            return jsonify({'error': 'No prompt audio found'}), 404
        
        prompt_speech_path = max(prompt_files, key=lambda p: p.stat().st_mtime)
        
        # TTS 생성
        logger.info(f"Generating TTS for user {user_id}: {text[:50]}...")
        
        with torch.no_grad():
            # prompt_text가 빈 문자열이면 None으로 처리
            final_prompt_text = prompt_text.strip() if prompt_text else None
            
            if final_prompt_text:
                wav = model.inference(
                    text=text,
                    prompt_speech_path=prompt_speech_path,
                    prompt_text=final_prompt_text
                )
            else:
                wav = model.inference(
                    text=text,
                    prompt_speech_path=prompt_speech_path
                )
        
        # 결과 저장
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_filename = f"{user_id}_{timestamp}.wav"
        output_path = RESULTS_FOLDER / output_filename
        
        sf.write(output_path, wav, samplerate=16000)
        
        logger.info(f"TTS generated successfully: {output_path}")
        
        return send_file(
            output_path,
            mimetype='audio/wav',
            as_attachment=True,
            download_name=f"generated_{timestamp}.wav"
        )
        
    except Exception as e:
        logger.error(f"TTS generation error: {e}")
        return jsonify({'error': f'TTS generation failed: {str(e)}'}), 500

@app.route('/voice-status/<user_id>', methods=['GET'])
def voice_status(user_id):
    """사용자 음성 모델 상태 확인"""
    try:
        user_folder = UPLOAD_FOLDER / user_id
        
        if not user_folder.exists():
            return jsonify({
                'hasVoiceModel': False,
                'message': '등록된 음성 모델이 없습니다.'
            })
        
        # 음성 파일 존재 확인
        prompt_files = list(user_folder.glob('*.wav')) + list(user_folder.glob('*.mp3'))
        
        if not prompt_files:
            return jsonify({
                'hasVoiceModel': False,
                'message': '음성 파일이 없습니다.'
            })
        
        # 가장 최근 파일 정보
        latest_file = max(prompt_files, key=lambda p: p.stat().st_mtime)
        
        # 오디오 정보 가져오기
        try:
            audio_data, sample_rate = sf.read(latest_file)
            duration = len(audio_data) / sample_rate
        except:
            duration = 0
            sample_rate = 0
        
        return jsonify({
            'hasVoiceModel': True,
            'message': '음성 모델이 준비되었습니다.',
            'filename': latest_file.name,
            'uploadTime': datetime.fromtimestamp(latest_file.stat().st_mtime).isoformat(),
            'duration': duration,
            'sampleRate': sample_rate
        })
        
    except Exception as e:
        logger.error(f"Status check error: {e}")
        return jsonify({
            'hasVoiceModel': False,
            'message': '상태 확인 중 오류가 발생했습니다.'
        })

@app.route('/generate-voice', methods=['POST'])
def generate_voice():
    """파라미터 기반 음성 생성 (성별, 피치, 속도)"""
    try:
        if model is None:
            return jsonify({'error': 'Model not initialized'}), 500
        
        data = request.get_json()
        text = data.get('text')
        gender = data.get('gender', 'male')  # male, female
        pitch = data.get('pitch', 'moderate')  # very_low, low, moderate, high, very_high
        speed = data.get('speed', 'moderate')  # very_low, low, moderate, high, very_high
        
        if not text:
            return jsonify({'error': 'text is required'}), 400
        
        logger.info(f"Generating voice with params: gender={gender}, pitch={pitch}, speed={speed}")
        
        with torch.no_grad():
            wav = model.inference(
                text=text,
                gender=gender,
                pitch=pitch,
                speed=speed
            )
        
        # 결과 저장
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_filename = f"generated_{timestamp}.wav"
        output_path = RESULTS_FOLDER / output_filename
        
        sf.write(output_path, wav, samplerate=16000)
        
        logger.info(f"Voice generated successfully: {output_path}")
        
        return send_file(
            output_path,
            mimetype='audio/wav',
            as_attachment=True,
            download_name=output_filename
        )
        
    except Exception as e:
        logger.error(f"Voice generation error: {e}")
        return jsonify({'error': f'Voice generation failed: {str(e)}'}), 500

if __name__ == '__main__':
    logger.info("Starting Flask TTS Server...")
    
    # 모델 초기화
    if not initialize_model():
        logger.error("Failed to initialize model. Exiting.")
        exit(1)
    
    # 서버 시작
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True,
        threaded=True
    ) 