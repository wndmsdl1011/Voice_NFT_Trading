import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import MarketplacePage from "./pages/MarketplacePage";
import NFTDetailsPage from "./pages/NFTDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import HelpPage from "./pages/HelpPage";
import PricingPage from "./pages/PricingPage";
import PrivacyPage from "./pages/PrivacyPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ResellPage from "./pages/ResellPage";
import SuccessPage from "./pages/SuccessPage";
import DocsPage from "./pages/DocsPage";
import ErrorPage from "./pages/ErrorPage";
import LoadingPage from "./pages/LoadingPage";
import GlobalStyles from "./styles/GlobalStyles";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/nft/:id" element={<NFTDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/resell/:id" element={<ResellPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/loading" element={<LoadingPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;
