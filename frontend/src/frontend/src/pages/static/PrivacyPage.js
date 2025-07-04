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

const PrivacyPage = () => {
  return (
    <PageContainer>
      <Container>
        <Title>개인정보처리방침</Title>
        <Card>
          <CardHeader>
            <CardTitle>개인정보 보호 정책</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ color: "var(--gray-600)", lineHeight: "1.6" }}>
              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                1. 수집하는 개인정보
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                음성NFT 플랫폼은 서비스 제공을 위해 최소한의 개인정보만을
                수집합니다. - 지갑 주소, 거래 내역, 업로드한 음성 파일
              </p>

              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                2. 개인정보 이용 목적
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                수집된 개인정보는 서비스 제공, 거래 처리, 고객 지원을 위해서만
                사용됩니다.
              </p>

              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                3. 개인정보 보관 및 삭제
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                블록체인에 기록된 정보는 영구 보관되며, 기타 개인정보는 서비스
                종료 시 삭제됩니다.
              </p>

              <h3 style={{ marginBottom: "1rem", color: "var(--gray-800)" }}>
                4. 개인정보 제3자 제공
              </h3>
              <p>
                법령에 의한 경우를 제외하고는 개인정보를 제3자에게 제공하지
                않습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default PrivacyPage;
