import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";

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
  max-width: 800px;
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

const AboutPage = () => {
  return (
    <PageContainer>
      <Container>
        <Title>음성NFT 소개</Title>
        <Card>
          <CardHeader>
            <CardTitle>우리의 미션</CardTitle>
          </CardHeader>
          <CardContent>
            <p style={{ marginBottom: "1rem", color: "var(--gray-600)" }}>
              음성NFT는 세계 최초의 음성 기반 NFT 마켓플레이스입니다. 우리는
              독특한 목소리를 디지털 자산으로 변환하여 크리에이터들이 자신만의
              음성을 소유하고 거래할 수 있도록 합니다.
            </p>
            <p style={{ color: "var(--gray-600)" }}>
              블록체인 기술과 AI를 활용하여 음성의 진위성을 보장하고, 모든
              거래에서 크리에이터에게 로열티를 제공합니다.
            </p>
          </CardContent>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default AboutPage;
