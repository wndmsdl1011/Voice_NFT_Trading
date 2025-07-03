import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { AlertTriangle, Home } from "lucide-react";

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

const ErrorIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background: var(--rose-500);
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

const ErrorCode = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--rose-500), var(--rose-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--gray-800);
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--gray-600);
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ErrorPage = () => {
  return (
    <PageContainer>
      <Container>
        <ErrorIcon>
          <AlertTriangle />
        </ErrorIcon>

        <ErrorCode>404</ErrorCode>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Description>
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </Description>

        <Card style={{ marginBottom: "2rem" }}>
          <CardContent style={{ padding: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
              다음을 시도해보세요:
            </h3>
            <ul
              style={{
                textAlign: "left",
                color: "var(--gray-600)",
                listStylePosition: "inside",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                URL을 다시 확인해주세요
              </li>
              <li style={{ marginBottom: "0.5rem" }}>홈페이지로 돌아가세요</li>
              <li style={{ marginBottom: "0.5rem" }}>
                브라우저를 새로고침해주세요
              </li>
              <li>문제가 지속되면 고객 지원에 문의해주세요</li>
            </ul>
          </CardContent>
        </Card>

        <ButtonGroup>
          <Button as={Link} to="/">
            <Home size={16} style={{ marginRight: "0.5rem" }} />
            홈으로 돌아가기
          </Button>
          <Button variant="outline" as={Link} to="/contact">
            문의하기
          </Button>
        </ButtonGroup>
      </Container>
    </PageContainer>
  );
};

export default ErrorPage;
