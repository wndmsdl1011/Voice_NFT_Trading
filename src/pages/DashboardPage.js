import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { TrendingUp, DollarSign, Music, Users } from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    var(--emerald-50),
    var(--white),
    var(--teal-50)
  );
  padding: 2rem 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  background: linear-gradient(to right, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StatCard = styled(Card)`
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background: ${(props) => props.$bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`;

const DashboardPage = () => {
  const stats = [
    {
      title: "총 수익",
      value: "12.5 ETH",
      icon: DollarSign,
      bgColor: "var(--emerald-500)",
    },
    {
      title: "생성한 NFT",
      value: "23",
      icon: Music,
      bgColor: "var(--teal-500)",
    },
    {
      title: "팔로워",
      value: "1,234",
      icon: Users,
      bgColor: "var(--cyan-500)",
    },
    {
      title: "조회수",
      value: "45.6K",
      icon: TrendingUp,
      bgColor: "var(--emerald-600)",
    },
  ];

  return (
    <PageContainer>
      <Container>
        <Title>대시보드</Title>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <CardContent style={{ padding: "1.5rem" }}>
                <IconWrapper $bgColor={stat.bgColor}>
                  <stat.icon />
                </IconWrapper>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.value}
                </div>
                <p style={{ color: "var(--gray-600)" }}>{stat.title}</p>
              </CardContent>
            </StatCard>
          ))}
        </StatsGrid>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          <Card>
            <CardHeader>
              <CardTitle>최근 활동</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: "var(--gray-600)" }}>
                최근 활동 내역이 여기에 표시됩니다.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>수익 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ color: "var(--gray-600)" }}>
                월별 수익 차트가 여기에 표시됩니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageContainer>
  );
};

export default DashboardPage;
