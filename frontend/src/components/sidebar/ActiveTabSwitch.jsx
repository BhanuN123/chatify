import { useChatStore } from "../../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="mx-3 mb-1 flex gap-1 rounded-lg bg-surface-raised p-1">
      <button
        onClick={() => setActiveTab("chats")}
        className={`pill-tab ${
          activeTab === "chats" ? "bg-surface-overlay text-ink-primary shadow-soft" : "text-ink-tertiary hover:text-ink-secondary"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`pill-tab ${
          activeTab === "contacts"
            ? "bg-surface-overlay text-ink-primary shadow-soft"
            : "text-ink-tertiary hover:text-ink-secondary"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
