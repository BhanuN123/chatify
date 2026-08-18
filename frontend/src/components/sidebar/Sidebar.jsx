import { useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarHeader from "./SidebarHeader";
import SidebarSearch from "./SidebarSearch";
import ActiveTabSwitch from "./ActiveTabSwitch";
import ChatsList from "./ChatsList";
import ContactList from "./ContactList";
import SidebarFooter from "./SidebarFooter";

function Sidebar({ collapsed, onToggleCollapse, className = "" }) {
  const { activeTab } = useChatStore();
  const [query, setQuery] = useState("");

  return (
    <aside
      className={`flex h-full flex-col bg-surface transition-[width] duration-200 ease-out ${className}`}
    >
      <SidebarHeader collapsed={collapsed} onToggle={onToggleCollapse} />

      {!collapsed && (
        <>
          <SidebarSearch
            value={query}
            onChange={setQuery}
            placeholder={activeTab === "chats" ? "Search conversations" : "Search contacts"}
          />
          <ActiveTabSwitch />
        </>
      )}

      <div className="flex-1 overflow-y-auto py-1">
        {activeTab === "chats" ? (
          <ChatsList query={query} collapsed={collapsed} />
        ) : (
          <ContactList query={query} collapsed={collapsed} />
        )}
      </div>

      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
}

export default Sidebar;
