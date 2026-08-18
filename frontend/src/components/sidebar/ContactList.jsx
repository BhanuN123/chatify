import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import ListSkeleton from "./ListSkeleton";
import EmptyListState from "./EmptyListState";
import ConversationItem from "./ConversationItem";

function ContactList({ query, collapsed }) {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <ListSkeleton collapsed={collapsed} />;
  if (allContacts.length === 0) return <EmptyListState variant="contacts" />;

  const filtered = query
    ? allContacts.filter((c) => c.fullName.toLowerCase().includes(query.toLowerCase()))
    : allContacts;

  if (filtered.length === 0) return <EmptyListState variant="search" />;

  return (
    <div className="space-y-0.5 px-2.5 py-1">
      {filtered.map((contact) => (
        <ConversationItem
          key={contact._id}
          user={contact}
          online={onlineUsers.includes(contact._id)}
          active={selectedUser?._id === contact._id}
          collapsed={collapsed}
          onClick={() => setSelectedUser(contact)}
        />
      ))}
    </div>
  );
}
export default ContactList;
