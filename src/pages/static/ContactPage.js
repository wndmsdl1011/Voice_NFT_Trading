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
import Textarea from "../../components/ui/Textarea";

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
  max-width: 600px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // 실제 구현에서는 API 호출
  };

  return (
    <PageContainer>
      <Container>
        <Title>문의하기</Title>
        <Card>
          <CardHeader>
            <CardTitle>궁금한 점이 있으시면 언제든 연락주세요</CardTitle>
          </CardHeader>
          <CardContent>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="이메일"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="문의 내용을 입력해주세요"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              />
              <Button type="submit" fullWidth>
                문의 보내기
              </Button>
            </Form>
          </CardContent>
        </Card>
      </Container>
    </PageContainer>
  );
};

export default ContactPage;
