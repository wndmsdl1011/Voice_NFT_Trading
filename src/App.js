import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
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
    <AppProvider>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/nft/:id" element={<NFTDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resell/:id" element={<ResellPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </AppProvider>
  );
}

export default App;
