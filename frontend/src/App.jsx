import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="h-screen w-full bg-bg-canvas">
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--surface-overlay)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            fontSize: "13.5px",
            padding: "10px 14px",
            boxShadow: "0 12px 40px -8px rgba(6, 8, 14, 0.6)",
          },
          success: { iconTheme: { primary: "#34d399", secondary: "var(--surface-overlay)" } },
          error: { iconTheme: { primary: "#f2564e", secondary: "var(--surface-overlay)" } },
        }}
      />
    </div>
  );
}
export default App;
