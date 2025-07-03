import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

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

const SettingsSection = styled.div`
  margin-bottom: 2rem;
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

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    displayName: "",
    email: "",
    bio: "",
    notifications: true,
    publicProfile: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <PageContainer>
      <Container>
        <Title>설정</Title>

        <SettingsSection>
          <Card>
            <CardHeader>
              <CardTitle>프로필 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <FormGroup>
                <Label>표시 이름</Label>
                <Input
                  name="displayName"
                  value={settings.displayName}
                  onChange={handleChange}
                  placeholder="프로필에 표시될 이름을 입력하세요"
                />
              </FormGroup>

              <FormGroup>
                <Label>이메일</Label>
                <Input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="이메일 주소를 입력하세요"
                />
              </FormGroup>

              <FormGroup>
                <Label>소개</Label>
                <Input
                  name="bio"
                  value={settings.bio}
                  onChange={handleChange}
                  placeholder="자신을 소개해주세요"
                />
              </FormGroup>
            </CardContent>
          </Card>
        </SettingsSection>

        <SettingsSection>
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                  />
                  <Label style={{ margin: 0 }}>이메일 알림 받기</Label>
                </div>
              </FormGroup>

              <FormGroup>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <input
                    type="checkbox"
                    name="publicProfile"
                    checked={settings.publicProfile}
                    onChange={handleChange}
                  />
                  <Label style={{ margin: 0 }}>프로필 공개</Label>
                </div>
              </FormGroup>
            </CardContent>
          </Card>
        </SettingsSection>

        <Button onClick={handleSave} size="lg">
          설정 저장
        </Button>
      </Container>
    </PageContainer>
  );
};

export default SettingsPage;
