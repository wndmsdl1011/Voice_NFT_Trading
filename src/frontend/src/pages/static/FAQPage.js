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

const FAQPage = () => {
  const faqs = [
    {
      question: "음성NFT란 무엇인가요?",
      answer:
        "음성NFT는 블록체인에 저장된 독특한 음성 파일입니다. 각 음성은 고유하며 소유권이 보장됩니다.",
    },
    {
      question: "어떻게 음성NFT를 생성하나요?",
      answer:
        "음성을 업로드하거나 직접 녹음한 후, AI 검증을 거쳐 블록체인에 민팅할 수 있습니다.",
    },
    {
      question: "로열티는 어떻게 받나요?",
      answer:
        "음성NFT가 재판매될 때마다 자동으로 로열티가 원작자에게 지급됩니다.",
    },
  ];

  return (
    <PageContainer>
      <Container>
        <Title>자주 묻는 질문</Title>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ color: "var(--gray-600)" }}>{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </PageContainer>
  );
};

export default FAQPage;
