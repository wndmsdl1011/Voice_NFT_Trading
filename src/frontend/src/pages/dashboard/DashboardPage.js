import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { 
  TrendingUp, 
  DollarSign, 
  Music, 
  Users, 
  Activity,
  Bell,
  Plus,
  Eye,
  ShoppingCart,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

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
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const WelcomeContent = styled.div``;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: var(--gray-600);
  font-size: 1rem;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StatsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StatCard = styled(Card)`
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.$accentColor || 'var(--emerald-500)'};
  }
`;

const StatContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatInfo = styled.div``;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: var(--gray-600);
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${props => props.$positive ? 'var(--emerald-600)' : 'var(--red-600)'};
`;

const StatIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: ${props => props.$bgColor || 'var(--emerald-500)'};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const ActivityFeed = styled(Card)``;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--gray-50);
  transition: background-color 0.2s;
  
  &:hover {
    background: var(--gray-100);
  }
`;

const ActivityIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${props => props.$bgColor || 'var(--emerald-100)'};
  color: ${props => props.$color || 'var(--emerald-600)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const ActivityDetails = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: var(--gray-900);
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.75rem;
  color: var(--gray-500);
`;

const NotificationPanel = styled(Card)``;

const DashboardPage = () => {
  const { user } = useAppContext();
  const [timeRange, setTimeRange] = useState('7days');

  const stats = [
    {
      title: "총 수익",
      value: "12.5 ETH",
      trend: "+12.3%",
      positive: true,
      icon: DollarSign,
      bgColor: "var(--emerald-500)",
      accentColor: "var(--emerald-500)"
    },
    {
      title: "이번 달 판매",
      value: "23",
      trend: "+5.2%",
      positive: true,
      icon: ShoppingCart,
      bgColor: "var(--teal-500)",
      accentColor: "var(--teal-500)"
    },
    {
      title: "총 조회수",
      value: "45.6K",
      trend: "+8.1%",
      positive: true,
      icon: Eye,
      bgColor: "var(--cyan-500)",
      accentColor: "var(--cyan-500)"
    },
    {
      title: "활성 리스팅",
      value: "8",
      trend: "-2",
      positive: false,
      icon: Music,
      bgColor: "var(--emerald-600)",
      accentColor: "var(--emerald-600)"
    },
  ];

  const recentActivities = [
    {
      type: "sale",
      title: "NFT 'Mystic Voice #123' 판매 완료",
      time: "2시간 전",
      icon: DollarSign,
      bgColor: "var(--emerald-100)",
      color: "var(--emerald-600)"
    },
    {
      type: "mint",
      title: "새 NFT 'Cosmic Echo #456' 생성",
      time: "5시간 전",
      icon: Plus,
      bgColor: "var(--teal-100)",
      color: "var(--teal-600)"
    },
    {
      type: "bid",
      title: "'Dream Melody #789'에 새로운 입찰",
      time: "1일 전",
      icon: TrendingUp,
      bgColor: "var(--cyan-100)",
      color: "var(--cyan-600)"
    },
    {
      type: "follow",
      title: "새 팔로워 15명 추가",
      time: "2일 전",
      icon: Users,
      bgColor: "var(--purple-100)",
      color: "var(--purple-600)"
    }
  ];

  const notifications = [
    {
      title: "지갑 연결 확인",
      description: "새로운 디바이스에서 지갑 연결이 감지되었습니다.",
      time: "방금 전",
      type: "security"
    },
    {
      title: "가격 변동 알림",
      description: "보유 중인 NFT 가격이 10% 상승했습니다.",
      time: "1시간 전",
      type: "price"
    },
    {
      title: "새로운 팔로워",
      description: "3명의 새로운 팔로워가 추가되었습니다.",
      time: "3시간 전",
      type: "social"
    }
  ];

  return (
    <PageContainer>
      <Container>
        <WelcomeSection>
          <WelcomeContent>
            <Title>대시보드</Title>
            <Subtitle>
              안녕하세요, {user?.nickname || "사용자"}님! 오늘의 활동을 확인해보세요.
            </Subtitle>
          </WelcomeContent>
          <QuickActions>
            <Button as={Link} to="/create">
              <Plus size={16} />
              NFT 생성
            </Button>
            <Button variant="outline" as={Link} to="/marketplace">
              <ShoppingCart size={16} />
              마켓플레이스
            </Button>
            <Button variant="outline" as={Link} to="/tts">
              <Music size={16} />
              TTS 스튜디오
            </Button>
          </QuickActions>
        </WelcomeSection>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index} $accentColor={stat.accentColor}>
              <CardContent style={{ padding: "1.5rem" }}>
                <StatContent>
                  <StatInfo>
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.title}</StatLabel>
                    <StatTrend $positive={stat.positive}>
                      {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stat.trend}
                    </StatTrend>
                  </StatInfo>
                  <StatIcon $bgColor={stat.bgColor}>
                    <stat.icon />
                  </StatIcon>
                </StatContent>
              </CardContent>
            </StatCard>
          ))}
        </StatsGrid>

        <ContentGrid>
          <ActivityFeed>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={20} />
                최근 활동
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityList>
                {recentActivities.map((activity, index) => (
                  <ActivityItem key={index}>
                    <ActivityIcon $bgColor={activity.bgColor} $color={activity.color}>
                      <activity.icon />
                    </ActivityIcon>
                    <ActivityDetails>
                      <ActivityTitle>{activity.title}</ActivityTitle>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityDetails>
                  </ActivityItem>
                ))}
              </ActivityList>
            </CardContent>
          </ActivityFeed>

          <NotificationPanel>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={20} />
                알림
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityList>
                {notifications.map((notification, index) => (
                  <ActivityItem key={index}>
                    <ActivityIcon $bgColor="var(--amber-100)" $color="var(--amber-600)">
                      <Bell size={12} />
                    </ActivityIcon>
                    <ActivityDetails>
                      <ActivityTitle>{notification.title}</ActivityTitle>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)', marginBottom: '0.25rem' }}>
                        {notification.description}
                      </div>
                      <ActivityTime>{notification.time}</ActivityTime>
                    </ActivityDetails>
                  </ActivityItem>
                ))}
              </ActivityList>
            </CardContent>
          </NotificationPanel>
        </ContentGrid>
      </Container>
    </PageContainer>
  );
};

export default DashboardPage;
