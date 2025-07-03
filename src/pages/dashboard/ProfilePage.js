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
} from "lucide-react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";

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

  const user = {
    name: "음성 아티스트",
    username: "@음성아티스트",
    bio: "카리스마 프로그래머",
    avatar: "음",
    socialPlatform: "instagram", // instagram, twitter, facebook
    walletAddress: "0x1234...5678",
    balance: "12.5 ETH",
    stats: {
      created: 12,
      collected: 8,
      sold: 15,
      earnings: "23.5 ETH",
    },
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <Instagram />;
      case "twitter":
        return <Twitter />;
      case "facebook":
        return <Facebook />;
      default:
        return null;
    }
  };

  const getSocialPlatformName = (platform) => {
    switch (platform) {
      case "instagram":
        return "Instagram";
      case "twitter":
        return "X (Twitter)";
      case "facebook":
        return "Facebook";
      default:
        return "";
    }
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(user.walletAddress);
    console.log("지갑 주소가 복사되었습니다");
  };

  return (
    <PageContainer>
      <Container>
        <ProfileHeader>
          <div className="avatar">{user.avatar}</div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="username">{user.username}</p>
            <p className="bio">{user.bio}</p>
            <div className="social-platform">
              <span className={`platform-icon ${user.socialPlatform}`}>
                {getSocialIcon(user.socialPlatform)}
              </span>
              <span>
                {getSocialPlatformName(user.socialPlatform)}으로 로그인
              </span>
            </div>
          </div>
          <div className="profile-actions">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              설정
            </Button>
            <Button variant="ghost">
              <ExternalLink className="w-4 h-4 mr-2" />
              연결 해제
            </Button>
          </div>
        </ProfileHeader>

        <BlockchainInfo>
          <InfoCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="info-header">
                <span className="label">지갑 주소</span>
                <button className="copy-btn" onClick={handleCopyWallet}>
                  <Copy />
                </button>
              </div>
              <div className="info-value">{user.walletAddress}</div>
            </CardContent>
          </InfoCard>

          <InfoCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="info-header">
                <span className="label">잔액</span>
              </div>
              <div className="info-amount">{user.balance}</div>
            </CardContent>
          </InfoCard>
        </BlockchainInfo>

        <StatsGrid>
          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <Plus />
              </div>
              <div className="stat-number">{user.stats.created}</div>
              <div className="stat-label">생성한 NFT</div>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <Heart />
              </div>
              <div className="stat-number">{user.stats.collected}</div>
              <div className="stat-label">수집한 NFT</div>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-number">{user.stats.sold}</div>
              <div className="stat-label">판매한 NFT</div>
            </CardContent>
          </StatCard>

          <StatCard>
            <CardContent style={{ padding: "1.5rem" }}>
              <div className="stat-icon">
                <Eye />
              </div>
              <div className="stat-number">{user.stats.earnings}</div>
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
              <Button>NFT 생성하기</Button>
            </EmptyState>
          )}

          {activeTab === "collected" && (
            <EmptyState>
              <div className="empty-icon">
                <Heart />
              </div>
              <h3>아직 수집한 NFT가 없습니다</h3>
              <p>마켓플레이스에서 멋진 음성 NFT를 찾아보세요!</p>
              <Button>마켓플레이스 둘러보기</Button>
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
