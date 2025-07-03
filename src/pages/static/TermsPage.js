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

const TermsPage = () => {
  return (
    <PageContainer>
      <Container>
        <Title>이용약관</Title>
        <Card>
          <CardHeader>
            <CardTitle>서비스 이용약관</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ color: "var(--gray-600)", lineHeight: "1.6" }}>
              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                1. 서비스 개요
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                음성NFT 플랫폼은 음성 기반 NFT의 생성, 거래, 수집을 위한
                서비스를 제공합니다.
              </p>

              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                2. 사용자 의무
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                사용자는 타인의 저작권을 침해하지 않는 음성만을 업로드해야
                합니다.
              </p>

              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                3. 거래 조건
              </h3>
              <p>모든 거래는 블록체인에 기록되며, 취소할 수 없습니다.</p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default TermsPage;
