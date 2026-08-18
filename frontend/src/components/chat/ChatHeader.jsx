import { ArrowLeftIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import Avatar from "../ui/Avatar";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-surface px-4 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={() => setSelectedUser(null)}
          className="icon-btn -ml-1 size-8 md:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeftIcon className="size-4.5" />
        </button>

        <Avatar src={selectedUser.profilePic} alt={selectedUser.fullName} online={isOnline} size="md" />

        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-semibold text-ink-primary">{selectedUser.fullName}</h3>
          <p className={`text-xs ${isOnline ? "text-signal-online" : "text-ink-tertiary"}`}>
            {isOnline ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="icon-btn hidden size-8 md:inline-flex"
        aria-label="Close conversation"
        title="Close conversation"
      >
        <XIcon className="size-4.5" />
      </button>
    </div>
  );
}
export default ChatHeader;
