#!/usr/bin/env python3
"""
Spark-TTS 모델 다운로드 스크립트
Hugging Face에서 SparkAudio/Spark-TTS-0.5B 모델을 다운로드합니다.
"""

import os
import sys
from pathlib import Path

try:
    from huggingface_hub import snapshot_download
except ImportError:
    print("huggingface_hub 라이브러리가 필요합니다.")
    print("설치 명령어: pip install huggingface_hub")
    sys.exit(1)

def download_spark_tts_model():
    """Spark-TTS 모델을 다운로드합니다."""
    
    # 모델 저장 경로
    model_dir = Path(__file__).parent / "pretrained_models" / "Spark-TTS-0.5B"
    
    # 디렉토리 생성
    model_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"Spark-TTS-0.5B 모델 다운로드 시작...")
    print(f"저장 경로: {model_dir}")
    
    try:
        # Hugging Face에서 모델 다운로드
        snapshot_download(
            repo_id="SparkAudio/Spark-TTS-0.5B",
            local_dir=str(model_dir),
            local_dir_use_symlinks=False,  # 심볼릭 링크 사용 안함
            resume_download=True,  # 중단된 다운로드 재개
        )
        
        print("✅ 모델 다운로드가 완료되었습니다!")
        print(f"모델 경로: {model_dir}")
        
        # 다운로드된 파일 확인
        if (model_dir / "config.yaml").exists():
            print("✅ config.yaml 파일 확인됨")
        else:
            print("⚠️ config.yaml 파일이 없습니다.")
            
        if (model_dir / "LLM").exists():
            print("✅ LLM 폴더 확인됨")
        else:
            print("⚠️ LLM 폴더가 없습니다.")
            
        return True
        
    except Exception as e:
        print(f"❌ 모델 다운로드 중 오류 발생: {e}")
        return False

def check_model_exists():
    """모델이 이미 다운로드되어 있는지 확인합니다."""
    model_dir = Path(__file__).parent / "pretrained_models" / "Spark-TTS-0.5B"
    config_file = model_dir / "config.yaml"
    llm_dir = model_dir / "LLM"
    
    if config_file.exists() and llm_dir.exists():
        print(f"✅ 모델이 이미 존재합니다: {model_dir}")
        return True
    else:
        print(f"❌ 모델이 존재하지 않습니다: {model_dir}")
        return False

if __name__ == "__main__":
    print("=== Spark-TTS 모델 다운로드 스크립트 ===")
    
    # 모델 존재 여부 확인
    if check_model_exists():
        response = input("모델이 이미 존재합니다. 다시 다운로드하시겠습니까? (y/N): ")
        if response.lower() != 'y':
            print("다운로드를 취소했습니다.")
            sys.exit(0)
    
    # 모델 다운로드
    success = download_spark_tts_model()
    
    if success:
        print("\n🎉 모델 다운로드가 성공적으로 완료되었습니다!")
        print("이제 Flask 서버를 실행할 수 있습니다:")
        print("python webui.py")
    else:
        print("\n❌ 모델 다운로드에 실패했습니다.")
        sys.exit(1) 