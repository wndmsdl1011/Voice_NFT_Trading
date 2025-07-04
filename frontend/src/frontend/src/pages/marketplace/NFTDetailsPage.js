import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Play, Heart, Share2 } from "lucide-react";
import Button from "../../components/ui/Button";
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
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const NFTGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;

const NFTImage = styled.div`
  aspect-ratio: 1;
  background: linear-gradient(
    to bottom right,
    var(--emerald-100),
    var(--teal-100)
  );
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .play-button {
    width: 5rem;
    height: 5rem;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-xl);
    cursor: pointer;
    transition: transform 0.15s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--emerald-600);
    }
  }
`;

const NFTInfo = styled.div`
  .nft-header {
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      font-weight: bold;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
    }

    .creator {
      color: var(--gray-600);
      font-size: 1.125rem;
    }
  }

  .nft-price {
    font-size: 2rem;
    font-weight: bold;
    color: var(--emerald-600);
    margin-bottom: 1.5rem;
  }

  .nft-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .nft-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;

    .stat-item {
      .label {
        font-size: 0.875rem;
        color: var(--gray-600);
        margin-bottom: 0.25rem;
      }

      .value {
        font-weight: 600;
        color: var(--gray-900);
      }
    }
  }
`;

const DescriptionCard = styled(Card)`
  border: none;
  box-shadow: var(--shadow-lg);
`;

const NFTDetailsPage = () => {
  const { id } = useParams();

  const nft = {
    id: id,
    title: "신비로운 속삭임 #001",
    creator: "@음성아티스트",
    price: "2.5 ETH",
    description:
      "이 독특한 음성 NFT는 신비로운 분위기를 자아내는 속삭임을 담고 있습니다. AI 기술을 통해 검증된 진위성과 높은 품질을 자랑합니다.",
    authenticity: 98,
    quality: 94,
    duration: "0:45",
    created: "2024년 1월 15일",
  };

  return (
    <PageContainer>
      <Container>
        <NFTGrid>
          <div>
            <NFTImage>
              <div className="play-button">
                <Play />
              </div>
            </NFTImage>
          </div>

          <NFTInfo>
            <div className="nft-header">
              <h1>{nft.title}</h1>
              <p className="creator">{nft.creator}</p>
            </div>

            <div className="nft-price">{nft.price}</div>

            <div className="nft-actions">
              <Button size="lg">지금 구매하기</Button>
              <Button variant="outline" size="lg">
                <Heart className="w-4 h-4 mr-2" />
                좋아요
              </Button>
              <Button variant="ghost" size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                공유
              </Button>
            </div>

            <div className="nft-stats">
              <div className="stat-item">
                <div className="label">진위성 점수</div>
                <div className="value">{nft.authenticity}%</div>
              </div>
              <div className="stat-item">
                <div className="label">품질 점수</div>
                <div className="value">{nft.quality}%</div>
              </div>
              <div className="stat-item">
                <div className="label">재생 시간</div>
                <div className="value">{nft.duration}</div>
              </div>
              <div className="stat-item">
                <div className="label">생성일</div>
                <div className="value">{nft.created}</div>
              </div>
            </div>

            <DescriptionCard>
              <CardHeader>
                <CardTitle>설명</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{nft.description}</p>
              </CardContent>
            </DescriptionCard>
          </NFTInfo>
        </NFTGrid>
      </Container>
    </PageContainer>
  );
};

export default NFTDetailsPage;
