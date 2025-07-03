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

const HelpPage = () => {
  const guides = [
    {
      title: "음성NFT 생성 가이드",
      content:
        "1. 음성 파일 업로드 또는 직접 녹음\n2. AI 진위성 검증 대기\n3. 메타데이터 입력\n4. 블록체인 민팅",
    },
    {
      title: "마켓플레이스 이용법",
      content:
        "검색 필터를 사용하여 원하는 음성NFT를 찾고, 상세 페이지에서 구매하실 수 있습니다.",
    },
    {
      title: "지갑 연결하기",
      content:
        "MetaMask, WalletConnect 등 지원되는 지갑을 연결하여 거래하실 수 있습니다.",
    },
  ];

  return (
    <PageContainer>
      <Container>
        <Title>도움말</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {guides.map((guide, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{guide.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: "var(--gray-600)", whiteSpace: "pre-line" }}>
                  {guide.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </PageContainer>
  );
};

export default HelpPage;
