import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { CheckCircle, ExternalLink } from "lucide-react";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    var(--emerald-50),
    var(--white),
    var(--teal-50)
  );
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background: var(--emerald-500);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;

  svg {
    width: 3rem;
    height: 3rem;
    color: white;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--emerald-600);
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
`;

const TransactionInfo = styled.div`
  padding: 1rem;
  background: var(--emerald-50);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const SuccessPage = () => {
  return (
    <PageContainer>
      <Container>
        <SuccessIcon>
          <CheckCircle />
        </SuccessIcon>

        <Title>거래 완료!</Title>
        <Description>음성 NFT 거래가 성공적으로 완료되었습니다.</Description>

        <Card style={{ marginBottom: "2rem" }}>
          <CardHeader>
            <CardTitle>거래 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionInfo>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>거래 해시:</strong>
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--gray-600)",
                  wordBreak: "break-all",
                  marginBottom: "1rem",
                }}
              >
                0x1234567890abcdef...
              </div>

              <div style={{ marginBottom: "0.5rem" }}>
                <strong>NFT:</strong> 신비로운 속삭임 #001
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>가격:</strong> 2.5 ETH
              </div>
              <div>
                <strong>상태:</strong>
                <span
                  style={{ color: "var(--emerald-600)", fontWeight: "500" }}
                >
                  {" "}
                  확인됨
                </span>
              </div>
            </TransactionInfo>
          </CardContent>
        </Card>

        <ButtonGroup>
          <Button as={Link} to="/marketplace">
            마켓플레이스로 돌아가기
          </Button>
          <Button variant="outline">
            <ExternalLink size={16} style={{ marginRight: "0.5rem" }} />
            블록체인에서 보기
          </Button>
        </ButtonGroup>
      </Container>
    </PageContainer>
  );
};

export default SuccessPage;
