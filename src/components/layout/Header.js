import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Menu, Wallet, User } from "lucide-react";
import Button from "../ui/Button";

const HeaderContainer = styled.header`
  border-bottom: 1px solid var(--teal-100);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background: linear-gradient(to right, var(--emerald-500), var(--teal-600));
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);

  span {
    color: white;
    font-weight: bold;
    font-size: 0.875rem;
  }
`;

const LogoText = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  background: linear-gradient(to right, var(--emerald-600), var(--teal-600));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  color: var(--gray-600);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: var(--emerald-600);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--gray-100);
  }
`;

const Avatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--emerald-100);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--emerald-700);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.25rem;
  width: 14rem;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: 0.375rem;
  box-shadow: var(--shadow-lg);
  padding: 0.25rem;
  z-index: 10;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: var(--gray-700);
  background: none;
  border: none;
  border-radius: 0.25rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-100);
  }

  svg {
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
  }
`;

const MobileMenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--gray-600);

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  border-left: 1px solid var(--gray-200);
  padding: 2rem;
  z-index: 100;
  transform: translateX(${(props) => (props.$open ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;

  @media (min-width: 640px) {
    width: 400px;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${(props) => (props.$open ? "block" : "none")};
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const MobileNavLink = styled(Link)`
  color: var(--gray-800);
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease-in-out;

  &:hover {
    color: var(--emerald-600);
  }
`;

const navigation = [
  { name: "마켓플레이스", href: "/marketplace" },
  { name: "NFT 생성", href: "/create" },
  { name: "TTS 스튜디오", href: "/tts" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    setIsConnected(false);
    setShowUserMenu(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>
              <span>음</span>
            </LogoIcon>
            <LogoText>음성NFT</LogoText>
          </Logo>

          <Nav>
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.href}>
                {item.name}
              </NavLink>
            ))}
          </Nav>

          <UserSection>
            {isConnected ? (
              <UserMenu>
                <UserButton onClick={handleUserMenuToggle}>
                  <Avatar>사</Avatar>
                </UserButton>
                {showUserMenu && (
                  <DropdownMenu>
                    <DropdownItem onClick={handleProfileClick}>
                      <User />
                      마이페이지
                    </DropdownItem>
                    <DropdownItem onClick={handleLogout}>
                      <Wallet />
                      지갑 연결 해제
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </UserMenu>
            ) : (
              <Button as={Link} to="/login">
                로그인
              </Button>
            )}

            <MobileMenuButton onClick={() => setIsOpen(true)}>
              <Menu className="w-5 h-5" />
            </MobileMenuButton>
          </UserSection>
        </HeaderContent>
      </HeaderContainer>

      <MobileMenuOverlay $open={isOpen} onClick={() => setIsOpen(false)} />
      <MobileMenu $open={isOpen}>
        <MobileNav>
          {navigation.map((item) => (
            <MobileNavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </MobileNavLink>
          ))}
        </MobileNav>
      </MobileMenu>
    </>
  );
};

export default Header;
