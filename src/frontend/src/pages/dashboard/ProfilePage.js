import React, { useState } from "react";
import styled from "styled-components";
import {
  Settings,
  Plus,
  TrendingUp,
  Heart,
  Eye,
  Copy,
  ExternalLink,
  Instagram,
  Twitter,
  Facebook,
  Edit3,
  Camera,
  Check,
  X
} from "lucide-react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { useAppContext } from "../../contexts/AppContext";
import { useToast } from "../../hooks/useToast";

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

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }

  .avatar {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    background: linear-gradient(
      to bottom right,
      var(--emerald-400),
      var(--teal-500)
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    margin: 0 auto;

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  .profile-info {
    flex: 1;
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }

    h1 {
      font-size: 2rem;
      font-weight: bold;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
    }

    .username {
      color: var(--gray-600);
      font-size: 1.125rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;

      @media (min-width: 768px) {
        justify-content: flex-start;
      }
    }

    .bio {
      color: var(--gray-700);
      max-width: 32rem;
      margin-bottom: 1rem;
    }

    .social-platform {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: var(--gray-600);

      @media (min-width: 768px) {
        justify-content: flex-start;
      }

      .platform-icon {
        padding: 0.25rem;
        border-radius: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;

        &.instagram {
          background: linear-gradient(
            45deg,
            #405de6,
            #5851db,
            #833ab4,
            #c13584,
            #e1306c
          );
          color: white;
        }

        &.twitter {
          background: #000000;
          color: white;
        }

        &.facebook {
          background: #1877f2;
          color: white;
        }

        svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }
  }

  .profile-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
`;

const BlockchainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const InfoCard = styled(Card)`
  flex: 1;
  border: none;
  box-shadow: var(--shadow-lg);

  .info-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .label {
      font-size: 0.875rem;
      color: var(--gray-600);
    }

    .copy-btn {
      background: none;
      border: none;
      color: var(--gray-400);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: all 0.15s ease;

      &:hover {
        color: var(--emerald-600);
        background: var(--emerald-50);
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .info-value {
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 0.875rem;
    color: var(--gray-900);
    word-break: break-all;
    margin-bottom: 0.5rem;
  }

  .info-amount {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--emerald-600);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  border: none;
  box-shadow: var(--shadow-lg);

  .stat-icon {
    width: 3rem;
    height: 3rem;
    background: linear-gradient(
      to bottom right,
      var(--emerald-100),
      var(--teal-100)
    );
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--emerald-600);
    }
  }

  .stat-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--gray-900);
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--gray-600);
  }
`;

const TabsSection = styled.div`
  .tabs-list {
    display: flex;
    background: var(--emerald-50);
    border: 1px solid var(--emerald-200);
    border-radius: 0.375rem;
    padding: 0.25rem;
    margin-bottom: 2rem;
  }

  .tab-trigger {
    flex: 1;
    padding: 0.75rem 1rem;
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
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  .empty-icon {
    width: 4rem;
    height: 4rem;
    background: var(--gray-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--gray-400);
    }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--gray-900);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--gray-600);
    margin-bottom: 1.5rem;
  }
`;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("created");
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const { user } = useAppContext();
  const { showSuccess, showError } = useToast();

  const getUserInitial = () => {
    if (!user) return "사";
    if (user.nickname) return user.nickname.charAt(0);
    if (user.email) return user.email.charAt(0).toUpperCase();
    return "사";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "정보 없음";
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatWalletAddress = (address) => {
    if (!address) return "지갑 연결 안됨";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "kakao":
        return <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>카</span>;
      case "instagram":
        return <Instagram />;
      case "twitter":
        return <Twitter />;
      case "facebook":
        return <Facebook />;
      default:
        return <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>소</span>;
    }
  };

  const getSocialPlatformName = (platform) => {
    switch (platform) {
      case "kakao":
        return "카카오";
      case "instagram":
        return "Instagram";
      case "twitter":
        return "X (Twitter)";
      case "facebook":
        return "Facebook";
      case "naver":
        return "네이버";
      case "google":
        return "구글";
      default:
        return platform || "소셜 로그인";
    }
  };

  const handleCopyWallet = () => {
    if (!user?.walletAddress) {
      showError("연결된 지갑이 없습니다.");
      return;
    }
    navigator.clipboard.writeText(user.walletAddress);
    showSuccess("지갑 주소가 복사되었습니다!");
  };

  const handleEditBio = () => {
    setEditedBio(user?.bio || "");
    setIsEditing(true);
  };

  const handleSaveBio = () => {
    // TODO: API 호출로 실제 저장 구현
    showSuccess("프로필이 업데이트되었습니다!");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBio("");
  };

  // 사용자가 없으면 로딩 또는 에러 상태 표시
  if (!user) {
    return (
      <PageContainer>
        <Container>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>사용자 정보를 불러오는 중...</h2>
            <p>잠시만 기다려주세요.</p>
          </div>
        </Container>
      </PageContainer>
    );
  }

  // 통계 데이터 (실제 데이터로 대체 필요)
  const stats = {
    created: 0, // 실제 생성한 NFT 수
    collected: 0, // 실제 수집한 NFT 수
    sold: 0, // 실제 판매한 NFT 수
    earnings: "0 ETH", // 실제 수익
  };

  return (
    <PageContainer>
      <Container>
        <ProfileHeader>
          <div className="avatar">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="프로필" 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%"
                }}
              />
            ) : (
              getUserInitial()
            )}
          </div>
          <div className="profile-info">
            <h1>{user.nickname || user.email || "사용자"}</h1>
            <p className="username">@{user.nickname?.replace(/\s+/g, '').toLowerCase() || "user"}</p>
            
            {isEditing ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  placeholder="자신을 소개해보세요..."
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: '1px solid var(--gray-300)',
                    borderRadius: '0.25rem'
                  }}
                />
                <Button size="sm" onClick={handleSaveBio}>
                  <Check size={14} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X size={14} />
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <p className="bio">{user.bio || "아직 소개가 없습니다."}</p>
                <Button size="sm" variant="ghost" onClick={handleEditBio}>
                  <Edit3 size={14} />
                </Button>
              </div>
            )}

            <div className="social-platform">
              <span className={`platform-icon ${user.provider}`}>
                {getSocialIcon(user.provider)}
              </span>
              <span>{getSocialPlatformName(user.provider)}으로 로그인</span>
            </div>

            <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.5rem' }}>
              가입일: {formatDate(user.createdAt)}
            </div>
          </div>
          <div className="profile-actions">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              설정
            </Button>
            <Button variant="ghost">
              <Camera className="w-4 h-4 mr-2" />
              사진 변경
            </Button>
          </div>
        </ProfileHeader>

        <BlockchainInfo>
          <InfoCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="info-header">
                <span className="label">지갑 주소</span>
                {user.walletAddress && (
                  <button className="copy-btn" onClick={handleCopyWallet}>
                    <Copy />
                  </button>
                )}
              </div>
              <div className="info-value">
                {formatWalletAddress(user.walletAddress)}
              </div>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="info-header">
                <span className="label">잔액</span>
              </div>
              <div className="info-amount">0 ETH</div>
            </CardContent>
          </InfoCard>
        </BlockchainInfo>

        <StatsGrid>
          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <Plus />
              </div>
              <div className="stat-number">{stats.created}</div>
              <div className="stat-label">생성한 NFT</div>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <Heart />
              </div>
              <div className="stat-number">{stats.collected}</div>
              <div className="stat-label">수집한 NFT</div>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-number">{stats.sold}</div>
              <div className="stat-label">판매한 NFT</div>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <Eye />
              </div>
              <div className="stat-number">{stats.earnings}</div>
              <div className="stat-label">총 수익</div>
            </CardContent>
          </StatCard>
        </StatsGrid>

        <TabsSection>
          <div className="tabs-list">
            <button
              className="tab-trigger"
              style={{
                backgroundColor:
                  activeTab === "created"
                    ? "var(--emerald-500)"
                    : "transparent",
                color: activeTab === "created" ? "white" : "var(--gray-700)",
              }}
              onClick={() => setActiveTab("created")}
            >
              생성한 NFT
            </button>
            <button
              className="tab-trigger"
              style={{
                backgroundColor:
                  activeTab === "collected"
                    ? "var(--emerald-500)"
                    : "transparent",
                color: activeTab === "collected" ? "white" : "var(--gray-700)",
              }}
              onClick={() => setActiveTab("collected")}
            >
              수집한 NFT
            </button>
            <button
              className="tab-trigger"
              style={{
                backgroundColor:
                  activeTab === "activity"
                    ? "var(--emerald-500)"
                    : "transparent",
                color: activeTab === "activity" ? "white" : "var(--gray-700)",
              }}
              onClick={() => setActiveTab("activity")}
            >
              활동 내역
            </button>
          </div>

          {activeTab === "created" && (
            <EmptyState>
              <div className="empty-icon">
                <Plus />
              </div>
              <h3>아직 생성한 NFT가 없습니다</h3>
              <p>첫 번째 음성 NFT를 만들어보세요!</p>
              <Button as="a" href="/create">NFT 생성하기</Button>
            </EmptyState>
          )}

          {activeTab === "collected" && (
            <EmptyState>
              <div className="empty-icon">
                <Heart />
              </div>
              <h3>아직 수집한 NFT가 없습니다</h3>
              <p>마켓플레이스에서 멋진 음성 NFT를 찾아보세요!</p>
              <Button as="a" href="/marketplace">마켓플레이스 둘러보기</Button>
            </EmptyState>
          )}

          {activeTab === "activity" && (
            <EmptyState>
              <div className="empty-icon">
                <TrendingUp />
              </div>
              <h3>활동 내역이 없습니다</h3>
              <p>NFT를 생성하거나 거래하면 여기에 기록됩니다.</p>
            </EmptyState>
          )}
        </TabsSection>
      </Container>
    </PageContainer>
  );
};

export default ProfilePage;
