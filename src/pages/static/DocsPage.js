import React from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Code, Book, Zap } from "lucide-react";

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

const DocsGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const DocCard = styled(Card)`
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background: ${(props) => props.$bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: white;
  }
`;

const CodeBlock = styled.pre`
  background: var(--gray-900);
  color: var(--gray-100);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  margin: 1rem 0;
`;

const DocsPage = () => {
  const docSections = [
    {
      title: "시작하기",
      description: "음성NFT 플랫폼 사용법을 빠르게 익혀보세요",
      icon: Zap,
      bgColor: "var(--emerald-500)",
    },
    {
      title: "API 문서",
      description: "개발자를 위한 REST API 및 SDK 문서",
      icon: Code,
      bgColor: "var(--teal-500)",
    },
    {
      title: "가이드",
      description: "상세한 기능 설명과 사용 예시",
      icon: Book,
      bgColor: "var(--cyan-500)",
    },
  ];

  return (
    <PageContainer>
      <Container>
        <Title>개발자 문서</Title>

        <DocsGrid>
          {docSections.map((section, index) => (
            <DocCard key={index}>
              <CardHeader>
                <IconWrapper $bgColor={section.bgColor}>
                  <section.icon />
                </IconWrapper>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: "var(--gray-600)" }}>
                  {section.description}
                </p>
              </CardContent>
            </DocCard>
          ))}
        </DocsGrid>

        <div style={{ marginTop: "3rem" }}>
          <Card>
            <CardHeader>
              <CardTitle>빠른 시작</CardTitle>
            </CardHeader>
            <CardContent>
              <p style={{ marginBottom: "1rem", color: "var(--gray-600)" }}>
                음성NFT 플랫폼과 상호작용하기 위한 기본 예시:
              </p>

              <CodeBlock>{`// 지갑 연결
const wallet = await connectWallet();

// 음성 NFT 생성
const nft = await createVoiceNFT({
  audioFile: file,
  metadata: {
    name: "My Voice NFT",
    description: "Unique voice recording"
  }
});

// 마켓플레이스에서 판매
await listForSale(nft.id, "1.5"); // 1.5 ETH`}</CodeBlock>

              <p style={{ color: "var(--gray-600)" }}>
                자세한 API 문서와 예시는 각 섹션에서 확인하실 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageContainer>
  );
};

export default DocsPage;
