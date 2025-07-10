import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Search, Play, Heart, Filter, Loader } from "lucide-react";
import Button from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useToast } from "../../hooks/useToast";
import apiService from "../../services/api";

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

const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: var(--gray-800);
  }

  p {
    color: var(--gray-600);
  }
`;

const FiltersSection = styled.div`
  margin-bottom: 2rem;

  .filters-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .search-container {
    flex: 1;
    position: relative;

    svg {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--gray-400);
      width: 1rem;
      height: 1rem;
    }

    input {
      padding-left: 2.5rem;
      border-color: var(--emerald-200);

      &:focus {
        border-color: var(--emerald-400);
      }
    }
  }

  .filters-group {
    display: flex;
    gap: 0.5rem;
  }
`;

const Select = styled.select`
  width: 140px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--emerald-200);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  background-color: var(--white);
  color: var(--gray-900);

  &:focus {
    outline: none;
    border-color: var(--emerald-400);
    box-shadow: 0 0 0 2px var(--emerald-100);
  }
`;

const TabsSection = styled.div`
  margin-bottom: 2rem;

  .tabs-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tabs-content {
    margin-top: 1.5rem;
  }
`;

const TabsList = styled.div`
  background: var(--emerald-50);
  border: 1px solid var(--emerald-200);
  border-radius: 0.375rem;
  padding: 0.25rem;
  display: flex;
`;

const TabsTrigger = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) =>
    props.$active ? "var(--emerald-500)" : "transparent"};
  color: ${(props) => (props.$active ? "white" : "var(--gray-700)")};
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--emerald-600)" : "var(--emerald-100)"};
  }
`;

const NFTGrid = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const NFTCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  border: none;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  background: white;

  &:hover {
    box-shadow: var(--shadow-xl);
    transform: scale(1.05);
  }
`;

const NFTImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  background: linear-gradient(
    to bottom right,
    var(--emerald-100),
    var(--teal-100)
  );
  overflow: hidden;

  .bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to right,
      rgba(52, 211, 153, 0.2),
      rgba(45, 212, 191, 0.2)
    );
  }

  .play-button {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .play-circle {
      width: 5rem;
      height: 5rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
      transition: transform 0.15s ease-in-out;

      svg {
        width: 2rem;
        height: 2rem;
        color: var(--emerald-600);
      }
    }
  }

  &:hover .play-circle {
    transform: scale(1.1);
  }
`;

const LikeButton = styled(Button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.8);

  &:hover {
    background: white;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: ${(props) => (props.$liked ? "var(--rose-500)" : "var(--gray-600)")};
    fill: ${(props) => (props.$liked ? "var(--rose-500)" : "none")};
  }
`;

const NFTInfo = styled.div`
  .nft-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .nft-details {
    flex: 1;
  }

  .nft-title {
    font-size: 1.125rem;
    color: var(--gray-800);
  }

  .nft-creator {
    color: var(--gray-600);
  }

  .nft-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nft-price {
    font-size: 1.125rem;
    font-weight: bold;
    color: var(--emerald-600);
  }
`;

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredNfts, setFilteredNfts] = useState([]);
  const { showError } = useToast();
  const errorShownRef = useRef(false); // 추가

  // NFT 목록 로딩
  useEffect(() => {
    const loadNFTs = async () => {
      try {
        setLoading(true);
        errorShownRef.current = false; // 새 요청마다 초기화
        console.log("NFT 목록 로딩 중...");

        const params = { sortBy };
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }
        const response = await apiService.nft.getList(params);

        console.log("NFT 목록 응답:", response);

        // API 응답 구조에 따라 데이터 추출
        const nftList = response.nfts || response.data || response || [];
        setNfts(Array.isArray(nftList) ? nftList : []);
      } catch (error) {
        console.error("NFT 목록 로딩 실패:", error);
        if (!errorShownRef.current) {
          showError("NFT 목록을 불러오는데 실패했습니다.");
          errorShownRef.current = true;
        }

        // 실패 시 빈 배열로 설정
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, [sortBy, showError]);

  // 검색 및 필터링
  useEffect(() => {
    let filtered = [...nfts];

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (nft) =>
          nft.title?.toLowerCase().includes(query) ||
          nft.description?.toLowerCase().includes(query) ||
          nft.creator?.toLowerCase().includes(query) ||
          nft.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredNfts(filtered);
  }, [nfts, searchQuery]);

  // 오디오 URL 생성 함수
  const getAudioUrl = (nft) => {
    if (nft.audioUrl) return nft.audioUrl;
    if (nft.audioCID) return `https://gateway.pinata.cloud/ipfs/${nft.audioCID}`;
    return null;
  };

  // 이미지 URL 생성 함수
  const getImageUrl = (nft) => {
    if (nft.imageUrl) return nft.imageUrl;
    if (nft.imageCID) return `https://gateway.pinata.cloud/ipfs/${nft.imageCID}`;
    return null;
  };

  // 오디오 재생 상태 관리
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  const handlePlayAudio = (nft) => {
    const audioUrl = getAudioUrl(nft);
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setPlayingId(nft.tokenId || nft.id);
      audio.play();
      audio.onended = () => {
        setPlayingId(null);
      };
      // 3초 후 강제 정지 (임시)
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setPlayingId(null);
      }, 3000);
    }
  };

  const renderNFTGrid = (nftList) => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Loader
            size={32}
            className="animate-spin"
            style={{ color: "var(--emerald-500)" }}
          />
          <p style={{ color: "var(--gray-600)" }}>NFT 목록을 불러오는 중...</p>
        </div>
      );
    }

    if (!nftList || nftList.length === 0) {
      return (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "var(--gray-600)",
          }}
        >
          <p style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>
            {searchQuery ? "검색 결과가 없습니다." : "NFT가 아직 없습니다."}
          </p>
          <p style={{ fontSize: "0.875rem" }}>
            {searchQuery
              ? "다른 검색어를 시도해보세요."
              : "첫 번째 NFT를 만들어보세요!"}
          </p>
        </div>
      );
    }

    return (
      <NFTGrid>
        {nftList.map((nft) => (
          <NFTCard key={nft.tokenId || nft.id}>
            <NFTImageContainer>
              {getImageUrl(nft) && (
                <img
                  src={getImageUrl(nft)}
                  alt={nft.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                  }}
                />
              )}
              <div className="bg-overlay"></div>
              <div className="play-button" onClick={() => handlePlayAudio(nft)} style={{ cursor: getAudioUrl(nft) ? 'pointer' : 'not-allowed' }}>
                <div className="play-circle" style={{ background: playingId === (nft.tokenId || nft.id) ? 'var(--emerald-600)' : 'rgba(255,255,255,0.9)' }}>
                  <Play style={{ color: playingId === (nft.tokenId || nft.id) ? 'white' : 'var(--emerald-600)', transform: playingId === (nft.tokenId || nft.id) ? 'scale(1.2)' : 'scale(1)' }} />
                </div>
              </div>
              <LikeButton variant="ghost" size="sm" $liked={nft.liked || false}>
                <Heart />
              </LikeButton>
            </NFTImageContainer>
            <CardHeader style={{ paddingBottom: "0.5rem" }}>
              <NFTInfo>
                <div className="nft-header">
                  <div className="nft-details">
                    <CardTitle className="nft-title">{nft.title}</CardTitle>
                    <CardDescription className="nft-creator">
                      {nft.creator || (nft.walletAddress ? `@${nft.walletAddress.slice(0, 8)}...` : "")}
                    </CardDescription>
                  </div>
                </div>
              </NFTInfo>
            </CardHeader>
            <CardContent>
              <NFTInfo>
                <div className="nft-footer">
                  <span className="nft-price">
                    {nft.price && parseFloat(nft.price) > 0 ? `${nft.price} ETH` : "Free"}
                  </span>
                  <Button
                    size="sm"
                    as={Link}
                    to={`/nft/${nft.tokenId || nft.id}`}
                  >
                    자세히 보기
                  </Button>
                </div>
              </NFTInfo>
            </CardContent>
          </NFTCard>
        ))}
      </NFTGrid>
    );
  };

  return (
    <PageContainer>
      <Container>
        <Header>
          <h1>음성 NFT 마켓플레이스</h1>
          <p>전 세계 크리에이터들의 독특한 음성 NFT를 발견하고 수집하세요</p>
        </Header>

        <FiltersSection>
          <div className="filters-row">
            <div className="search-container">
              <Search />
              <Input
                placeholder="제목, 태그 또는 크리에이터로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filters-group">
              <Select>
                <option value="all">모든 언어</option>
                <option value="ko">한국어</option>
                <option value="en">영어</option>
                <option value="ja">일본어</option>
              </Select>
              <Select>
                <option value="all">모든 가격</option>
                <option value="low">0-1 ETH</option>
                <option value="mid">1-3 ETH</option>
                <option value="high">3+ ETH</option>
              </Select>
            </div>
          </div>
        </FiltersSection>

        <TabsSection>
          <div className="tabs-header">
            <TabsList>
              <TabsTrigger
                $active={sortBy === "latest"}
                onClick={() => setSortBy("latest")}
              >
                최신순
              </TabsTrigger>
              <TabsTrigger
                $active={sortBy === "popular"}
                onClick={() => setSortBy("popular")}
              >
                인기순
              </TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              style={{
                borderColor: "var(--emerald-200)",
                color: "var(--emerald-700)",
                backgroundColor: "transparent",
              }}
            >
              <Filter className="w-4 h-4 mr-2" />더 많은 필터
            </Button>
          </div>

          <div className="tabs-content">
            {sortBy === "latest" && renderNFTGrid(filteredNfts)}
            {sortBy === "popular" && renderNFTGrid([...filteredNfts].reverse())}
          </div>
        </TabsSection>
      </Container>
    </PageContainer>
  );
};

export default MarketplacePage;
