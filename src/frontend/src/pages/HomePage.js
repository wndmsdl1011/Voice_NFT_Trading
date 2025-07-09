import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Play,
  Mic,
  ShoppingBag,
  DollarSign,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { requireAuth } from "../utils/auth";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    var(--emerald-50),
    var(--white),
    var(--teal-50)
  );
`;

const Section = styled.section`
  padding: ${(props) => props.$py || "4rem"} 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: ${(props) => (props.$center ? "center" : "left")};
`;

const HeroTitle = styled.h1`
  font-size: 3.75rem;
  line-height: 1;
  font-weight: bold;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    to right,
    var(--emerald-600),
    var(--teal-600),
    var(--cyan-600)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureGrid = styled.div`
  display: grid;
  gap: 2rem;
  max-width: 72rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const FeatureCard = styled(Card)`
  text-align: center;
  transition: all 0.3s ease-in-out;
  border: none;
  box-shadow: var(--shadow-lg);
  background: linear-gradient(
    to bottom right,
    var(--white),
    ${(props) => props.$bgColor}
  );

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: scale(1.05);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(
    to right,
    ${(props) => props.$from},
    ${(props) => props.$to}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: var(--shadow-lg);

  svg {
    width: 2rem;
    height: 2rem;
    color: white;
  }
`;

const DemoSection = styled(Section)`
  background: linear-gradient(to right, var(--emerald-50), var(--teal-50));
`;

const DemoGrid = styled.div`
  display: grid;
  gap: 2rem;
  align-items: center;
  max-width: 56rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const DemoCard = styled(Card)`
  border: none;
  box-shadow: var(--shadow-xl);
`;

const DemoVisualizer = styled.div`
  width: 100%;
  height: 16rem;
  background: linear-gradient(
    to bottom right,
    var(--emerald-100),
    var(--teal-100)
  );
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const DemoBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(52, 211, 153, 0.2),
    rgba(45, 212, 191, 0.2)
  );
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const PlayButton = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;

  .play-circle {
    width: 5rem;
    height: 5rem;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    box-shadow: var(--shadow-xl);

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--emerald-600);
    }
  }

  p {
    color: var(--gray-600);
    font-weight: 500;
  }
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: linear-gradient(to right, var(--emerald-50), var(--teal-50));
  border-radius: 0.5rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  margin: 0 1rem;

  .progress-track {
    width: 100%;
    background-color: var(--gray-200);
    border-radius: 9999px;
    height: 0.5rem;
  }

  .progress-fill {
    background: linear-gradient(to right, var(--emerald-500), var(--teal-500));
    height: 0.5rem;
    border-radius: 9999px;
    width: 33.333%;
  }
`;

const DemoInfo = styled.div`
  .info-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--gray-800);
  }

  .info-list {
    margin-bottom: 1.5rem;

    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;

      .label {
        color: var(--gray-600);
      }

      .value {
        font-weight: 500;

        &.price {
          font-weight: bold;
          color: var(--emerald-600);
        }
      }
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 2rem;
  text-align: center;
  max-width: 56rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: linear-gradient(
    to bottom right,
    ${(props) => props.$from},
    ${(props) => props.$to}
  );

  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    svg {
      width: 2rem;
      height: 2rem;
      color: ${(props) => props.$iconColor};
    }
  }

  .stat-number {
    font-size: 2.25rem;
    font-weight: bold;
    color: ${(props) => props.$iconColor};
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: var(--gray-600);
    font-weight: 500;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--gray-800);
`;

const SectionDescription = styled.p`
  color: var(--gray-600);
  margin-bottom: 3rem;
`;

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateClick = (e) => {
    e.preventDefault();
    if (requireAuth(navigate, "/create")) {
      navigate("/create");
    }
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (requireAuth(navigate, "/profile")) {
      navigate("/profile");
    }
  };

  return (
    <PageContainer>
      {/* Hero Section */}
      <Section $py="5rem">
        <Container $center>
          <Badge className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Web3 음성 플랫폼
          </Badge>
          <HeroTitle>
            독특한 음성을
            <br />
            소유하고 거래하세요
          </HeroTitle>
          <HeroDescription>
            세상에 하나뿐인 음성 NFT를 생성하고, 수집하고, 거래하세요. 당신의
            목소리를 디지털 자산으로 변환하고 모든 거래에서 로열티를 받으세요.
          </HeroDescription>
          <Button size="lg" as={Link} to="/create" onClick={handleCreateClick}>
            지금 시작하기
          </Button>
        </Container>
      </Section>

      {/* Feature Cards */}
      <Section>
        <Container>
          <FeatureGrid>
            <FeatureCard $bgColor="var(--emerald-50)" hoverEffect>
              <CardHeader>
                <FeatureIcon
                  $from="var(--emerald-400)"
                  $to="var(--emerald-600)"
                >
                  <Mic />
                </FeatureIcon>
                <CardTitle style={{ color: "var(--emerald-800)" }}>
                  음성 NFT 생성
                </CardTitle>
                <CardDescription>
                  독특한 음성을 업로드하거나 녹음하여 AI 기반 진위성 검증과 함께
                  NFT로 민팅하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  fullWidth
                  as={Link}
                  to="/create"
                  onClick={handleCreateClick}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--emerald-200)",
                    color: "var(--emerald-700)",
                  }}
                >
                  생성 시작하기
                </Button>
              </CardContent>
            </FeatureCard>

            <FeatureCard $bgColor="var(--teal-50)" hoverEffect>
              <CardHeader>
                <FeatureIcon $from="var(--teal-400)" $to="var(--teal-600)">
                  <ShoppingBag />
                </FeatureIcon>
                <CardTitle style={{ color: "var(--teal-800)" }}>
                  마켓플레이스 탐색
                </CardTitle>
                <CardDescription>
                  전 세계 크리에이터들의 다양한 감정과 스타일을 가진 희귀한 음성
                  NFT를 발견하고 수집하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  fullWidth
                  as={Link}
                  to="/marketplace"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--teal-200)",
                    color: "var(--teal-700)",
                  }}
                >
                  지금 둘러보기
                </Button>
              </CardContent>
            </FeatureCard>

            <FeatureCard $bgColor="var(--cyan-50)" hoverEffect>
              <CardHeader>
                <FeatureIcon $from="var(--cyan-400)" $to="var(--cyan-600)">
                  <DollarSign />
                </FeatureIcon>
                <CardTitle style={{ color: "var(--cyan-800)" }}>
                  로열티 수익
                </CardTitle>
                <CardDescription>
                  음성 NFT에서 자동 로열티 지급으로 모든 재판매에서 수동적
                  수입을 얻으세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  fullWidth
                  as={Link}
                  to="/profile"
                  onClick={handleProfileClick}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "var(--cyan-200)",
                    color: "var(--cyan-700)",
                  }}
                >
                  수익 확인하기
                </Button>
              </CardContent>
            </FeatureCard>
          </FeatureGrid>
        </Container>
      </Section>

      {/* Demo Section */}
      <DemoSection>
        <Container>
          <div className="text-center mb-12">
            <SectionTitle>음성 NFT 체험하기</SectionTitle>
            <SectionDescription>
              독특한 음성들을 듣고 시각적 표현을 확인해보세요
            </SectionDescription>
          </div>

          <DemoGrid>
            <div>
              <DemoCard>
                <CardContent className="p-8">
                  <DemoVisualizer>
                    <DemoBackground />
                    <PlayButton>
                      <div className="play-circle">
                        <Play />
                      </div>
                      <p>음성 시각화</p>
                    </PlayButton>
                  </DemoVisualizer>
                  <PlayerControls>
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      샘플 재생
                    </Button>
                    <ProgressBar>
                      <div className="progress-track">
                        <div className="progress-fill"></div>
                      </div>
                    </ProgressBar>
                    <span
                      style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}
                    >
                      0:15 / 0:45
                    </span>
                  </PlayerControls>
                </CardContent>
              </DemoCard>
            </div>

            <DemoInfo>
              <h3 className="info-title">추천 음성 NFT</h3>
              <div className="info-list">
                <div className="info-item">
                  <span className="label">제목:</span>
                  <span className="value">신비로운 속삭임 #001</span>
                </div>
                <div className="info-item">
                  <span className="label">크리에이터:</span>
                  <span className="value">@음성아티스트</span>
                </div>
                <div className="info-item">
                  <span className="label">가격:</span>
                  <span className="value price">2.5 ETH</span>
                </div>
              </div>
              <Button fullWidth as={Link} to="/marketplace">
                마켓플레이스에서 보기
              </Button>
            </DemoInfo>
          </DemoGrid>
        </Container>
      </DemoSection>

      {/* Stats Section */}
      <Section>
        <Container>
          <StatsGrid>
            <StatCard
              $from="var(--emerald-50)"
              $to="var(--emerald-100)"
              $iconColor="var(--emerald-600)"
            >
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-number">1,234</div>
              <p className="stat-label">생성된 음성 NFT</p>
            </StatCard>

            <StatCard
              $from="var(--teal-50)"
              $to="var(--teal-100)"
              $iconColor="var(--teal-600)"
            >
              <div className="stat-icon">
                <Users />
              </div>
              <div className="stat-number">567</div>
              <p className="stat-label">활성 크리에이터</p>
            </StatCard>

            <StatCard
              $from="var(--cyan-50)"
              $to="var(--cyan-100)"
              $iconColor="var(--cyan-600)"
            >
              <div className="stat-icon">
                <DollarSign />
              </div>
              <div className="stat-number">89.2</div>
              <p className="stat-label">ETH 총 거래량</p>
            </StatCard>
          </StatsGrid>
        </Container>
      </Section>
    </PageContainer>
  );
};

export default HomePage;
