import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ListSkeleton from "./ListSkeleton";
import EmptyListState from "./EmptyListState";
import ConversationItem from "./ConversationItem";

function ChatsList({ query, collapsed }) {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <ListSkeleton collapsed={collapsed} />;
  if (chats.length === 0) return <EmptyListState variant="chats" />;

  const filtered = query
    ? chats.filter((c) => c.fullName.toLowerCase().includes(query.toLowerCase()))
    : chats;

  if (filtered.length === 0) return <EmptyListState variant="search" />;

  return (
    <div className="space-y-0.5 px-2.5 py-1">
      {filtered.map((chat) => (
        <ConversationItem
          key={chat._id}
          user={chat}
          online={onlineUsers.includes(chat._id)}
          active={selectedUser?._id === chat._id}
          collapsed={collapsed}
          onClick={() => setSelectedUser(chat)}
        />
      ))}
    </div>
  );
}
export default ChatsList;
