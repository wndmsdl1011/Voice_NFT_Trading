import React from "react";
import { AppProvider } from "./contexts/AppContext";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/router";
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
          <AppRouter />
        </MainContent>
        <Footer />

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{
            // Default options
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              fontWeight: "500",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },

            // Success toasts
            success: {
              style: {
                background: "#10B981",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#10B981",
              },
            },

            // Error toasts
            error: {
              style: {
                background: "#EF4444",
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#EF4444",
              },
            },

            // Loading toasts
            loading: {
              style: {
                background: "#6B7280",
                color: "#fff",
              },
            },
          }}
        />
      </AppContainer>
    </AppProvider>
  );
}

export default App;
