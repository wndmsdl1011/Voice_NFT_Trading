import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  Upload,
  Mic,
  CheckCircle,
  Zap,
  Palette,
  DollarSign,
} from "lucide-react";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Progress from "../components/ui/Progress";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    var(--emerald-50),
    var(--white),
    var(--teal-50)
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

  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--gray-800);
  }

  p {
    color: var(--gray-600);
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const StepList = styled.div`
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
  background-color: ${(props) =>
    props.$completed
      ? "var(--emerald-500)"
      : props.$active
      ? "var(--emerald-600)"
      : "var(--gray-200)"};
  color: ${(props) =>
    props.$completed || props.$active ? "white" : "var(--gray-400)"};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const StepLabel = styled.span`
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: ${(props) =>
    props.$active ? "var(--emerald-600)" : "var(--gray-500)"};
  font-weight: ${(props) => (props.$active ? "500" : "400")};
`;

const StepConnector = styled.div`
  width: 4rem;
  height: 1px;
  margin: 0 1rem;
  background-color: ${(props) =>
    props.$completed ? "var(--emerald-500)" : "var(--gray-300)"};
`;

const StepContent = styled.div`
  max-width: 42rem;
  margin: 0 auto;
`;

const StepCard = styled(Card)`
  border: none;
  box-shadow: var(--shadow-xl);
`;

const FileUploadArea = styled.div`
  border: 2px dashed var(--emerald-300);
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  background: rgba(236, 253, 245, 0.5);

  &:hover {
    border-color: var(--emerald-400);
  }

  svg {
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0.5rem;
    color: var(--emerald-400);
  }

  p {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-bottom: 0.25rem;
  }

  .file-info {
    font-size: 0.75rem;
    color: var(--gray-500);
  }
`;

const RecordingButton = styled(Button)`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border-color: ${(props) =>
    props.$recording ? "var(--rose-500)" : "var(--emerald-300)"};
  color: ${(props) =>
    props.$recording ? "var(--rose-700)" : "var(--emerald-700)"};
  background-color: transparent;

  &:hover {
    background-color: ${(props) =>
      props.$recording ? "var(--rose-50)" : "var(--emerald-50)"};
  }

  svg {
    width: 2rem;
    height: 2rem;
    animation: ${(props) => (props.$recording ? "pulse 1s infinite" : "none")};
  }
`;

const RecordingSection = styled.div`
  text-align: center;

  p {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-top: 0.75rem;
  }
`;

const ProgressSection = styled.div`
  margin: 1.5rem 0;

  .progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .progress-label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .progress-value {
      font-size: 0.875rem;
      color: var(--gray-500);
    }
  }
`;

const AIResultsSection = styled.div`
  .results-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .result-item {
    .result-label {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
    }

    .result-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--emerald-600);
    }
  }

  .artwork-section {
    text-align: center;

    .artwork-image {
      width: 12rem;
      height: 12rem;
      background: linear-gradient(
        to bottom right,
        var(--emerald-100),
        var(--teal-100)
      );
      border-radius: 0.5rem;
      margin: 0 auto 1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      .placeholder {
        color: var(--gray-500);
        font-size: 0.875rem;
      }
    }
  }
`;

const FormSection = styled.div`
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-700);
      margin-bottom: 0.5rem;
    }
  }
`;

const MintingSection = styled.div`
  text-align: center;

  .mint-summary {
    background: linear-gradient(to right, var(--emerald-50), var(--teal-50));
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;

    .summary-title {
      font-size: 1.125rem;
      font-weight: bold;
      color: var(--gray-800);
      margin-bottom: 1rem;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;

      .label {
        color: var(--gray-600);
      }

      .value {
        font-weight: 500;
        color: var(--gray-800);
      }
    }
  }
`;

const steps = [
  { number: 1, title: "음성 업로드", icon: Upload },
  { number: 2, title: "AI 처리", icon: Zap },
  { number: 3, title: "메타데이터 추가", icon: Palette },
  { number: 4, title: "NFT 민팅", icon: DollarSign },
];

function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [audioFile, setAudioFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const fileInputRef = useRef(null);

  const aiResults = {
    authenticity: 98,
    quality: 94,
    artwork: "/placeholder.svg?height=300&width=300",
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
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
          setCurrentStep(2);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        processAudio();
      }, 5000);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMintNFT = () => {
    console.log("NFT 민팅 데이터:", { audioFile, formData, aiResults });
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <h1>음성 NFT 생성</h1>
          <p>당신의 독특한 음성을 가치 있는 디지털 자산으로 변환하세요</p>
        </Header>

        <StepIndicator>
          <StepList>
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep >= step.number;
              const isCompleted = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  <StepItem>
                    <StepCircle $completed={isCompleted} $active={isActive}>
                      {isCompleted ? <CheckCircle /> : <IconComponent />}
                    </StepCircle>
                    <StepLabel $active={isActive}>{step.title}</StepLabel>
                  </StepItem>
                  {index < steps.length - 1 && (
                    <StepConnector $completed={currentStep > step.number} />
                  )}
                </React.Fragment>
              );
            })}
          </StepList>
        </StepIndicator>

        <StepContent>
          {currentStep === 1 && (
            <StepCard>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  음성 업로드 또는 녹음
                </CardTitle>
                <CardDescription>
                  음성을 추가할 방법을 선택하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 style={{ fontWeight: 500, marginBottom: "0.75rem" }}>
                    음성 파일 업로드
                  </h3>
                  <FileUploadArea onClick={() => fileInputRef.current?.click()}>
                    <Upload />
                    <p>
                      {audioFile
                        ? audioFile.name
                        : "클릭하여 업로드하거나 드래그 앤 드롭"}
                    </p>
                    <p className="file-info">MP3, WAV, M4A (최대 10MB)</p>
                  </FileUploadArea>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>

                <div style={{ textAlign: "center" }}>
                  <span style={{ color: "var(--gray-500)" }}>또는</span>
                </div>

                <div>
                  <h3 style={{ fontWeight: 500, marginBottom: "0.75rem" }}>
                    음성 녹음
                  </h3>
                  <RecordingSection>
                    <RecordingButton
                      size="lg"
                      variant={isRecording ? "destructive" : "outline"}
                      $recording={isRecording}
                      onClick={handleRecording}
                    >
                      <Mic />
                    </RecordingButton>
                    <p>
                      {isRecording
                        ? "녹음 중... 클릭하여 중지"
                        : "클릭하여 녹음 시작"}
                    </p>
                  </RecordingSection>
                </div>

                {isProcessing && (
                  <ProgressSection>
                    <div className="progress-header">
                      <span className="progress-label">오디오 처리 중...</span>
                      <span className="progress-value">
                        {processingProgress}%
                      </span>
                    </div>
                    <Progress value={processingProgress} />
                  </ProgressSection>
                )}
              </CardContent>
            </StepCard>
          )}

          {currentStep === 2 && (
            <StepCard>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  AI 처리 결과
                </CardTitle>
                <CardDescription>
                  AI가 분석한 음성의 품질과 진위성
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIResultsSection>
                  <div className="results-grid">
                    <div className="result-item">
                      <div className="result-label">진위성 점수</div>
                      <div className="result-value">
                        {aiResults.authenticity}%
                      </div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">품질 점수</div>
                      <div className="result-value">{aiResults.quality}%</div>
                    </div>
                  </div>

                  <div className="artwork-section">
                    <h3 style={{ fontWeight: 500, marginBottom: "0.75rem" }}>
                      생성된 아트워크
                    </h3>
                    <div className="artwork-image">
                      <div className="placeholder">AI 생성 시각화</div>
                    </div>
                  </div>

                  <Button onClick={handleNextStep} fullWidth>
                    다음 단계로
                  </Button>
                </AIResultsSection>
              </CardContent>
            </StepCard>
          )}

          {currentStep === 3 && (
            <StepCard>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  메타데이터 추가
                </CardTitle>
                <CardDescription>NFT에 대한 정보를 입력하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <FormSection>
                  <div className="form-group">
                    <label>제목</label>
                    <Input
                      placeholder="NFT 제목을 입력하세요"
                      value={formData.title}
                      onChange={(e) =>
                        handleFormChange("title", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>설명</label>
                    <Textarea
                      placeholder="NFT에 대한 설명을 입력하세요"
                      value={formData.description}
                      onChange={(e) =>
                        handleFormChange("description", e.target.value)
                      }
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label>태그</label>
                    <Input
                      placeholder="태그를 쉼표로 구분하여 입력하세요"
                      value={formData.tags}
                      onChange={(e) => handleFormChange("tags", e.target.value)}
                    />
                  </div>

                  <Button onClick={handleNextStep} fullWidth>
                    다음 단계로
                  </Button>
                </FormSection>
              </CardContent>
            </StepCard>
          )}

          {currentStep === 4 && (
            <StepCard>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  NFT 민팅
                </CardTitle>
                <CardDescription>
                  마지막 단계입니다. NFT를 민팅하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MintingSection>
                  <div className="mint-summary">
                    <div className="summary-title">민팅 요약</div>
                    <div className="summary-item">
                      <span className="label">제목:</span>
                      <span className="value">
                        {formData.title || "제목 없음"}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="label">진위성 점수:</span>
                      <span className="value">{aiResults.authenticity}%</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">품질 점수:</span>
                      <span className="value">{aiResults.quality}%</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">예상 가스비:</span>
                      <span className="value">0.05 ETH</span>
                    </div>
                  </div>

                  <Button onClick={handleMintNFT} size="lg">
                    NFT 민팅하기
                  </Button>
                </MintingSection>
              </CardContent>
            </StepCard>
          )}
        </StepContent>
      </Container>
    </PageContainer>
  );
}

export default CreatePage;
