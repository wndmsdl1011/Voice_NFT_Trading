import React, { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Badge from "../components/ui/Badge";
import Progress from "../components/ui/Progress";
import { useToast } from "../hooks/useToast";
import {
  Upload,
  Mic,
  CheckCircle,
  Palette,
  DollarSign,
  Brain,
  AudioWaveform,
  Play,
  Pause,
  Volume2,
  Image,
} from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #f0fdfa 0%,
    #ffffff 35%,
    #f0f9ff 65%,
    #ecfdf5 100%
  );
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #1f2937;
  background: linear-gradient(135deg, #065f46, #0e7490);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepCircle = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.completed ? "#10b981" : props.active ? "#059669" : "#e5e7eb"};
  color: ${(props) => (props.active || props.completed ? "white" : "#9ca3af")};
  margin-bottom: 0.5rem;
`;

const StepTitle = styled.span`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${(props) => (props.active ? "#059669" : "#6b7280")};
  font-weight: ${(props) => (props.active ? "500" : "normal")};
`;

const StepConnector = styled.div`
  width: 4rem;
  height: 1px;
  background: ${(props) => (props.completed ? "#10b981" : "#d1d5db")};
  margin: 0 1rem;
`;

const StyledCard = styled(Card)`
  border: none;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
`;

const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
`;

const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

const CardDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

const UploadArea = styled.div`
  border: 2px dashed #86efac;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  background: rgba(240, 253, 250, 0.5);
  transition: all 0.2s ease;

  &:hover {
    border-color: #4ade80;
    background: rgba(240, 253, 250, 0.8);
  }
`;

const RecordButton = styled(Button)`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: ${(props) => (props.recording ? "none" : "2px solid #86efac")};
  color: ${(props) => (props.recording ? "white" : "#047857")};
  background: ${(props) => (props.recording ? "#ef4444" : "transparent")};

  &:hover {
    background: ${(props) =>
      props.recording ? "#dc2626" : "rgba(240, 253, 250, 0.8)"};
  }
`;

const ProcessingContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(240, 253, 250, 0.5);
  border-radius: 12px;
  border: 1px solid #bbf7d0;
`;

const ProcessingItem = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ProcessingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProcessingTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ProcessingProgress = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ProcessingDescription = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const PreviewCard = styled(StyledCard)`
  border: 2px solid #c084fc;
  background: linear-gradient(
    135deg,
    rgba(196, 132, 252, 0.05),
    rgba(236, 72, 153, 0.05)
  );
`;

const SampleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SampleButton = styled.button`
  padding: 0.75rem;
  text-align: left;
  font-size: 0.875rem;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.selected ? "#c084fc" : "#e5e7eb")};
  background: ${(props) => (props.selected ? "#f3e8ff" : "white")};
  color: ${(props) => (props.selected ? "#7c3aed" : "#374151")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #c084fc;
    background: rgba(243, 232, 255, 0.5);
  }
`;

const PlayButton = styled(Button)`
  background: linear-gradient(135deg, #7c3aed, #ec4899);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.125rem;

  &:hover {
    background: linear-gradient(135deg, #6d28d9, #db2777);
  }
`;

const AudioVisualization = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #c084fc;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 1rem;
`;

const AudioBar = styled.div`
  width: 4px;
  background: linear-gradient(to top, #7c3aed, #ec4899);
  border-radius: 2px;
  height: ${(props) => props.height}px;
  animation: pulse 0.5s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.4;
    }
    50% {
      opacity: 1;
    }
  }
`;

const InfoCard = styled.div`
  background: ${(props) => props.color};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.borderColor};
`;

const InfoTitle = styled.h4`
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const HelpText = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const SummaryGrid = styled.div`
  background: #f0fdf4;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid #bbf7d0;
  margin-bottom: 1.5rem;
`;

const SummaryTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #065f46;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: #6b7280;
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: #1f2937;
`;

const GasFeeCard = styled.div`
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const GasFeeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const GasFeeAmount = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: #059669;
`;

const MintButton = styled(Button)`
  background: linear-gradient(135deg, #10b981, #0891b2);
  border: none;
  height: 3rem;

  &:hover {
    background: linear-gradient(135deg, #059669, #0e7490);
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #bbf7d0;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

function CreatePage() {
  const { showSuccess, showPromise } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [audioFile, setAudioFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSample, setSelectedSample] = useState(0);
  const [customText, setCustomText] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const sampleTexts = [
    "안녕하세요, 저는 새로 학습된 AI 음성입니다. 자연스러운 발음으로 말씀드리고 있어요.",
    "오늘 날씨가 정말 좋네요. 이런 날에는 산책을 하거나 공원에서 시간을 보내는 것이 좋겠어요.",
    "AI 기술의 발전으로 이제 개인의 목소리도 디지털로 복제할 수 있게 되었습니다.",
    "책을 읽어드릴 때는 이런 톤으로 차분하고 따뜻하게 전달해드릴 수 있습니다.",
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      showSuccess(`${file.name} 파일이 업로드되었습니다.`);
      processAudio();
    }
  };

  const processAudio = () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          startTraining();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setCurrentStep(2);
          return 100;
        }
        return prev + 5;
      });
    }, 500);
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        processAudio();
      }, 8000);
    }
  };

  const handlePlaySample = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleMintNFT = () => {
    console.log("NFT 민팅 데이터:", { audioFile, formData });

    const mintingPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({ tokenId: Math.floor(Math.random() * 10000) });
        } else {
          reject(new Error("민팅 중 오류가 발생했습니다."));
        }
      }, 3000);
    });

    showPromise(mintingPromise, {
      loading: "NFT 민팅 중...",
      success: (data) =>
        `NFT가 성공적으로 민팅되었습니다! Token ID: ${data.tokenId}`,
      error: "NFT 민팅에 실패했습니다. 다시 시도해주세요.",
    })
      .then(() => {
        setTimeout(() => {
          window.location.href = "/marketplace";
        }, 2000);
      })
      .catch(() => {
        // 에러 처리는 이미 토스트로 표시됨
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      showSuccess(`${file.name} 이미지가 업로드되었습니다.`);
    }
  };

  const steps = [
    { number: 1, title: "음성 업로드", icon: Upload },
    { number: 2, title: "AI 음성 학습", icon: Brain },
    { number: 3, title: "메타데이터 추가", icon: Palette },
    { number: 4, title: "NFT 민팅", icon: DollarSign },
  ];

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>AI 음성 NFT 생성</Title>
          <Description>
            당신의 음성을 AI가 학습하여 독특한 TTS 음성 NFT로 변환하세요
          </Description>
        </Header>

        <StepIndicator>
          <StepContainer>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep >= step.number;
              const isCompleted = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  <StepItem>
                    <StepCircle active={isActive} completed={isCompleted}>
                      {isCompleted ? (
                        <CheckCircle size={24} />
                      ) : (
                        <IconComponent size={24} />
                      )}
                    </StepCircle>
                    <StepTitle active={isActive}>{step.title}</StepTitle>
                  </StepItem>
                  {index < steps.length - 1 && (
                    <StepConnector completed={currentStep > step.number} />
                  )}
                </React.Fragment>
              );
            })}
          </StepContainer>
        </StepIndicator>

        <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
          {currentStep === 1 && (
            <StyledCard>
              <CardHeader>
                <CardTitle>
                  <Upload size={20} />
                  음성 샘플 업로드 또는 녹음
                </CardTitle>
                <CardDescription>
                  AI 학습을 위한 음성 샘플을 제공하세요 (최소 30초 권장)
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: "0 1.5rem 1.5rem" }}>
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontWeight: 500, marginBottom: "0.75rem" }}>
                    음성 파일 업로드
                  </h3>
                  <UploadArea onClick={() => fileInputRef.current?.click()}>
                    <Upload
                      size={32}
                      style={{ margin: "0 auto 0.5rem", color: "#4ade80" }}
                    />
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {audioFile
                        ? audioFile.name
                        : "클릭하여 업로드하거나 드래그 앤 드롭"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                        marginTop: "0.25rem",
                      }}
                    >
                      MP3, WAV, M4A (최대 50MB, 30초 이상 권장)
                    </p>
                  </UploadArea>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
{/* 
                <div style={{ textAlign: "center", margin: "1.5rem 0" }}>
                  <span style={{ color: "#9ca3af" }}>또는</span>
                </div>

                <div>
                  <h3 style={{ fontWeight: 500, marginBottom: "0.75rem" }}>
                    음성 녹음
                  </h3>
                  <div style={{ textAlign: "center" }}>
                    <RecordButton
                      recording={isRecording}
                      onClick={handleRecording}
                    >
                      <Mic size={32} />
                    </RecordButton>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        marginTop: "0.75rem",
                      }}
                    >
                      {isRecording
                        ? "녹음 중... 클릭하여 중지"
                        : "클릭하여 녹음 시작"}
                    </p>
                  </div>
                </div> */}

                {(isProcessing || isTraining) && (
                  <ProcessingContainer>
                    <ProcessingItem>
                      <ProcessingHeader>
                        <ProcessingTitle>
                          <AudioWaveform size={20} color="#059669" />
                          <span>오디오 전처리 중...</span>
                        </ProcessingTitle>
                        <ProcessingProgress>
                          {processingProgress}%
                        </ProcessingProgress>
                      </ProcessingHeader>
                      <Progress value={processingProgress} />
                      <ProcessingDescription>
                        노이즈 제거, 음성 분할, 품질 향상 중
                      </ProcessingDescription>
                    </ProcessingItem>

                    {isTraining && (
                      <ProcessingItem>
                        <ProcessingHeader>
                          <ProcessingTitle>
                            <Brain size={20} color="#7c3aed" />
                            <span>AI 음성 모델 학습 중...</span>
                          </ProcessingTitle>
                          <ProcessingProgress>
                            {trainingProgress}%
                          </ProcessingProgress>
                        </ProcessingHeader>
                        <Progress value={trainingProgress} />
                        <ProcessingDescription>
                          딥러닝 모델이 당신의 음성 특성을 학습하고 있습니다
                        </ProcessingDescription>
                      </ProcessingItem>
                    )}
                  </ProcessingContainer>
                )}
              </CardContent>
            </StyledCard>
          )}

          {currentStep === 2 && (
            <StyledCard>
              <CardHeader>
                <CardTitle>
                  <Volume2 size={24} />
                  AI 음성 학습 완료 - 음성 미리보기
                </CardTitle>
                <CardDescription>
                  AI가 당신의 음성을 성공적으로 학습했습니다. 아래에서 다양한
                  텍스트로 결과를 확인해보세요
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: "0 1.5rem 1.5rem" }}>
                <PreviewCard style={{ marginBottom: "2rem" }}>
                  <CardHeader>
                    <CardTitle
                      style={{ fontSize: "1.25rem", color: "#7c3aed" }}
                    >
                      <CheckCircle size={24} color="#059669" />
                      학습된 AI 음성으로 미리듣기
                    </CardTitle>
                    <CardDescription>
                      다양한 샘플 텍스트나 직접 입력한 텍스트로 AI 음성을
                      테스트해보세요
                    </CardDescription>
                  </CardHeader>
                  <CardContent style={{ padding: "0 1.5rem 1.5rem" }}>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h4
                        style={{
                          fontWeight: 500,
                          marginBottom: "0.75rem",
                          color: "#1f2937",
                        }}
                      >
                        샘플 텍스트 선택
                      </h4>
                      <SampleGrid>
                        {sampleTexts.map((text, index) => (
                          <SampleButton
                            key={index}
                            selected={selectedSample === index}
                            onClick={() => setSelectedSample(index)}
                          >
                            {text}
                          </SampleButton>
                        ))}
                      </SampleGrid>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <h4
                        style={{
                          fontWeight: 500,
                          marginBottom: "0.5rem",
                          color: "#1f2937",
                        }}
                      >
                        또는 직접 입력
                      </h4>
                      <Textarea
                        placeholder="원하는 텍스트를 입력하여 AI 음성으로 들어보세요..."
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        rows={3}
                        style={{ borderColor: "#c084fc" }}
                      />
                    </div>

                    <div
                      style={{ textAlign: "center", marginBottom: "1.5rem" }}
                    >
                      <PlayButton onClick={handlePlaySample}>
                        {isPlaying ? (
                          <>
                            <Pause
                              size={24}
                              style={{ marginRight: "0.5rem" }}
                            />
                            재생 중...
                          </>
                        ) : (
                          <>
                            <Play size={24} style={{ marginRight: "0.5rem" }} />
                            음성 미리듣기
                          </>
                        )}
                      </PlayButton>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#6b7280",
                          marginTop: "0.5rem",
                        }}
                      >
                        {customText
                          ? "입력한 텍스트"
                          : `샘플 ${selectedSample + 1}`}
                        로 음성을 생성합니다
                      </p>
                    </div>

                    {isPlaying && (
                      <AudioVisualization>
                        {[...Array(20)].map((_, i) => (
                          <AudioBar
                            key={i}
                            height={Math.random() * 40 + 10}
                            delay={i * 0.1}
                          />
                        ))}
                      </AudioVisualization>
                    )}
                  </CardContent>
                </PreviewCard>

                <InfoCard color="#eff6ff" borderColor="#bfdbfe">
                  <InfoTitle style={{ color: "#1e40af" }}>
                    🎉 학습 완료!
                  </InfoTitle>
                  <InfoText style={{ color: "#1e40af" }}>
                    AI가 당신의 음성 특성을 성공적으로 학습했습니다. 위에서
                    다양한 텍스트로 음성을 테스트해보세요.
                  </InfoText>
                  <InfoText style={{ color: "#1d4ed8" }}>
                    만족스러우시면 이 음성 모델을 NFT로 민팅하여 다른 사용자들이
                    구매하고 TTS 기능으로 사용할 수 있게 하세요.
                  </InfoText>
                </InfoCard>

                <Button
                  onClick={handleNextStep}
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, #059669, #0e7490)",
                    border: "none",
                    height: "3rem",
                    fontSize: "1.125rem",
                    marginTop: "1.5rem",
                  }}
                >
                  음성이 만족스럽습니다. 메타데이터로 계속
                </Button>
              </CardContent>
            </StyledCard>
          )}

          {currentStep === 3 && (
            <StyledCard>
              <CardHeader>
                <CardTitle>
                  <Palette size={20} />
                  메타데이터 추가
                </CardTitle>
                <CardDescription>
                  AI 음성 NFT에 대한 세부 정보를 제공하세요
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: "0 1.5rem 1.5rem" }}>
                <FormGroup>
                  <Label>제목</Label>
                  <Input
                    placeholder="예: 김민수의 따뜻한 목소리"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    style={{ borderColor: "#bbf7d0" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>설명</Label>
                  <Textarea
                    placeholder="이 AI 음성의 특징과 용도를 설명해주세요..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    style={{ borderColor: "#bbf7d0" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>태그</Label>
                  <Input
                    placeholder="쉼표로 구분된 태그 입력"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    style={{ borderColor: "#bbf7d0" }}
                  />
                  <HelpText>예: 남성, 따뜻함, 내레이션, 한국어</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>판매 가격 (ETH) *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    style={{ borderColor: "#bbf7d0" }}
                  />
                  <HelpText>NFT 판매 가격을 ETH 단위로 입력하세요</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>마켓플레이스 이미지</Label>
                  <UploadArea onClick={() => imageInputRef.current?.click()}>
                    <Image
                      size={32}
                      style={{ margin: "0 auto 0.5rem", color: "#4ade80" }}
                    />
                    <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {formData.image
                        ? formData.image.name
                        : "클릭하여 이미지 업로드"}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                        marginTop: "0.25rem",
                      }}
                    >
                      JPG, PNG, GIF (최대 10MB, 권장: 500x500px)
                    </p>
                  </UploadArea>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  {imagePreview && (
                    <ImagePreview>
                      <PreviewImage src={imagePreview} alt="NFT 미리보기" />
                    </ImagePreview>
                  )}
                  <HelpText>
                    마켓플레이스에 표시될 NFT 대표 이미지를 업로드하세요
                  </HelpText>
                </FormGroup>

                <InfoCard color="#fffbeb" borderColor="#fde68a">
                  <InfoTitle style={{ color: "#d97706" }}>
                    💡 TTS 사용 권한
                  </InfoTitle>
                  <InfoText style={{ color: "#d97706" }}>
                    이 NFT를 구매한 사용자는 학습된 AI 음성으로 텍스트를
                    음성으로 변환할 수 있습니다.
                  </InfoText>
                </InfoCard>

                <Button
                  onClick={handleNextStep}
                  disabled={
                    !formData.title ||
                    !formData.description ||
                    !formData.price ||
                    parseFloat(formData.price) <= 0
                  }
                  style={{
                    width: "100%",
                    background:
                      formData.title &&
                      formData.description &&
                      formData.price &&
                      parseFloat(formData.price) > 0
                        ? "linear-gradient(135deg, #059669, #0e7490)"
                        : "#9ca3af",
                    border: "none",
                    marginTop: "1.5rem",
                  }}
                >
                  민팅으로 계속
                </Button>
              </CardContent>
            </StyledCard>
          )}

          {currentStep === 4 && (
            <StyledCard>
              <CardHeader>
                <CardTitle>
                  <DollarSign size={20} />
                  AI 음성 NFT 민팅하기
                </CardTitle>
                <CardDescription>
                  AI 음성 모델을 NFT로 민팅하고 마켓플레이스에 등록하세요
                </CardDescription>
              </CardHeader>
              <CardContent style={{ padding: "0 1.5rem 1.5rem" }}>
                <SummaryGrid>
                  <SummaryTitle>NFT 요약</SummaryTitle>
                  <SummaryItem>
                    <SummaryLabel>제목:</SummaryLabel>
                    <SummaryValue>{formData.title || "제목 없음"}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>판매 가격:</SummaryLabel>
                    <SummaryValue>
                      {formData.price ? `${formData.price} ETH` : "가격 없음"}
                    </SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>이미지:</SummaryLabel>
                    <SummaryValue>
                      {formData.image ? "업로드됨" : "없음"}
                    </SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>학습 상태:</SummaryLabel>
                    <Badge
                      variant="outline"
                      style={{ borderColor: "#bbf7d0", color: "#047857" }}
                    >
                      성공
                    </Badge>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>TTS 기능:</SummaryLabel>
                    <Badge
                      variant="outline"
                      style={{ borderColor: "#bfdbfe", color: "#1d4ed8" }}
                    >
                      활성화됨
                    </Badge>
                  </SummaryItem>
                </SummaryGrid>

                <GasFeeCard>
                  <GasFeeHeader>
                    <span style={{ fontWeight: 500 }}>예상 가스비</span>
                    <GasFeeAmount>0.025 ETH</GasFeeAmount>
                  </GasFeeHeader>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    이더리움에서 민팅하기 위한 네트워크 수수료
                  </p>
                </GasFeeCard>

                <MintButton onClick={handleMintNFT}>
                  <DollarSign size={20} style={{ marginRight: "0.5rem" }} />
                  AI 음성 NFT 민팅하기
                </MintButton>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  민팅함으로써 이용약관에 동의하고 AI 음성 모델의 소유권을
                  확인합니다
                </p>
              </CardContent>
            </StyledCard>
          )}
        </div>
      </Container>
    </PageContainer>
  );
}

export default CreatePage;
