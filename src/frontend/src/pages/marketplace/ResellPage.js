import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Music, DollarSign } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

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
  margin-bottom: 2rem;
  background: linear-gradient(to right, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NFTPreview = styled.div`
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const NFTImage = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, var(--emerald-100), var(--teal-100));
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 4rem;
    height: 4rem;
    color: var(--emerald-600);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--gray-700);
`;

const ResellPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showError } = useToast();
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("7");
  
  // 중복 실행 방지를 위한 ref
  const authCheckRef = useRef(false);

  // 인증 상태 체크 및 리다이렉트
  useEffect(() => {
    if (authCheckRef.current) return; // 이미 실행됐으면 중단
    
    if (!isAuthenticated) {
      authCheckRef.current = true;
      showError("NFT 재판매를 하려면 로그인이 필요합니다.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return;
    }
  }, [isAuthenticated, navigate, showError]);

  const handleResell = () => {
    if (!isAuthenticated) {
      showError("재판매하려면 로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    
    console.log("Reselling NFT:", { id, price, duration });
  };

  return (
    <PageContainer>
      <Container>
        <Title>NFT 재판매</Title>

        <NFTPreview>
          <NFTImage>
            <Music />
          </NFTImage>

          <Card>
            <CardHeader>
              <CardTitle>신비로운 속삭임 #{id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ color: "var(--gray-600)", marginBottom: "0.5rem" }}>
                  현재 소유자
                </p>
                <p style={{ fontWeight: "500" }}>@당신</p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <p style={{ color: "var(--gray-600)", marginBottom: "0.5rem" }}>
                  구매 가격
                </p>
                <p style={{ fontWeight: "500", color: "var(--emerald-600)" }}>
                  2.5 ETH
                </p>
              </div>

              <div>
                <p style={{ color: "var(--gray-600)", marginBottom: "0.5rem" }}>
                  로열티
                </p>
                <p style={{ fontWeight: "500" }}>5% (원작자에게)</p>
              </div>
            </CardContent>
          </Card>
        </NFTPreview>

        <Card>
          <CardHeader>
            <CardTitle>판매 설정</CardTitle>
          </CardHeader>
          <CardContent>
            <FormGroup>
              <Label>판매 가격 (ETH)</Label>
              <Input
                type="number"
                step="0.001"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="판매 가격을 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <Label>경매 기간 (일)</Label>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="경매 기간을 입력하세요"
              />
            </FormGroup>

            <div
              style={{
                padding: "1rem",
                background: "var(--emerald-50)",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <DollarSign size={16} color="var(--emerald-600)" />
                <span style={{ fontWeight: "500" }}>수수료 안내</span>
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--gray-600)" }}>
                플랫폼 수수료 2.5%, 원작자 로열티 5%가 차감됩니다.
              </p>
            </div>

            <Button onClick={handleResell} fullWidth size="lg">
              판매 등록하기
            </Button>
          </CardContent>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default ResellPage;
