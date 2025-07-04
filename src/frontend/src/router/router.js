import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth pages
import LoginPage from "../pages/auth/LoginPage";
import AuthSuccessPage from "../pages/auth/AuthSuccessPage";
import CompleteProfilePage from "../pages/auth/CompleteProfilePage";

// Main pages
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import TTSPage from "../pages/tts/TTSPage";

// Marketplace pages
import MarketplacePage from "../pages/marketplace/MarketplacePage";
import NFTDetailsPage from "../pages/marketplace/NFTDetailsPage";
import ResellPage from "../pages/marketplace/ResellPage";

// Dashboard pages
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import SettingsPage from "../pages/dashboard/SettingsPage";

// Static pages
import AboutPage from "../pages/static/AboutPage";
import ContactPage from "../pages/static/ContactPage";
import DocsPage from "../pages/static/DocsPage";
import FAQPage from "../pages/static/FAQPage";
import HelpPage from "../pages/static/HelpPage";
import PricingPage from "../pages/static/PricingPage";
import PrivacyPage from "../pages/static/PrivacyPage";
import TermsPage from "../pages/static/TermsPage";

// Utility pages
import SuccessPage from "../pages/SuccessPage";
import ErrorPage from "../pages/ErrorPage";
import LoadingPage from "../pages/LoadingPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />

      {/* TTS routes */}
      <Route path="/tts" element={<TTSPage />} />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth-success" element={<AuthSuccessPage />} />
      <Route path="/complete-profile" element={<CompleteProfilePage />} />

      {/* Marketplace routes */}
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/nft/:id" element={<NFTDetailsPage />} />
      <Route path="/resell/:id" element={<ResellPage />} />

      {/* Dashboard routes */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* Static pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* Utility routes */}
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/loading" element={<LoadingPage />} />

      {/* Catch all route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
