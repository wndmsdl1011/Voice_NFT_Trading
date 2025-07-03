import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";

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
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(to right, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PricingGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PricingCard = styled(Card)`
  text-align: center;
  position: relative;
  border: 2px solid
    ${(props) => (props.$featured ? "var(--emerald-500)" : "var(--gray-200)")};
`;

const PricingPage = () => {
  const plans = [
    {
      name: "기본",
      price: "무료",
      features: ["월 3개 음성NFT 생성", "5% 거래 수수료", "기본 AI 검증"],
    },
    {
      name: "프로",
      price: "0.1 ETH/월",
      features: [
        "무제한 음성NFT 생성",
        "2.5% 거래 수수료",
        "고급 AI 검증",
        "우선 지원",
      ],
      featured: true,
    },
    {
      name: "엔터프라이즈",
      price: "문의",
      features: [
        "무제한 생성",
        "1% 거래 수수료",
        "맞춤 AI 검증",
        "전용 지원",
        "API 접근",
      ],
    },
  ];

  return (
    <PageContainer>
      <Container>
        <Title>요금제</Title>
        <PricingGrid>
          {plans.map((plan, index) => (
            <PricingCard key={index} $featured={plan.featured}>
              {plan.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--emerald-500)",
                    color: "white",
                    padding: "0.25rem 1rem",
                    borderRadius: "1rem",
                    fontSize: "0.875rem",
                  }}
                >
                  인기
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "var(--emerald-600)",
                  }}
                >
                  {plan.price}
                </div>
              </CardHeader>
              <CardContent>
                <ul style={{ textAlign: "left", color: "var(--gray-600)" }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ marginBottom: "0.5rem" }}>
                      • {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? "default" : "outline"}
                  fullWidth
                  style={{ marginTop: "1rem" }}
                >
                  {plan.price === "문의" ? "문의하기" : "선택하기"}
                </Button>
              </CardContent>
            </PricingCard>
          ))}
        </PricingGrid>
      </Container>
    </PageContainer>
  );
};

export default PricingPage;
