import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/sidebar/Sidebar";
import ChatContainer from "../components/chat/ChatContainer";
import WelcomeScreen from "../components/chat/WelcomeScreen";

function ChatPage() {
  const { selectedUser } = useChatStore();
  const [collapsed, setCollapsed] = useState(false);

  // reading the last collapse preference keeps the layout consistent across visits
  useEffect(() => {
    const stored = localStorage.getItem("isSidebarCollapsed");
    if (stored) setCollapsed(JSON.parse(stored));
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      localStorage.setItem("isSidebarCollapsed", JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-canvas">
      {/* SIDEBAR — full width on mobile when no chat is open, rail/panel on desktop */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggleCollapsed}
        className={`shrink-0 border-r border-border ${collapsed ? "md:w-[76px]" : "md:w-[300px]"} ${
          selectedUser ? "hidden md:flex" : "flex w-full md:w-auto"
        }`}
      />

      {/* CHAT PANEL */}
      <main className={`min-w-0 flex-1 ${selectedUser ? "flex" : "hidden md:flex"} flex-col`}>
        {selectedUser ? <ChatContainer /> : <WelcomeScreen />}
      </main>
    </div>
  );
}
export default ChatPage;
