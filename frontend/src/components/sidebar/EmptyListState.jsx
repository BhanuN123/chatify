import { MessageSquareIcon, SearchXIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";

const ICONS = { chats: MessageSquareIcon, contacts: UsersIcon, search: SearchXIcon };

function EmptyListState({ variant = "chats" }) {
  const { setActiveTab } = useChatStore();
  const Icon = ICONS[variant];

  const copy = {
    chats: {
      title: "No conversations yet",
      body: "Pick someone from Contacts to start chatting.",
      action: (
        <button onClick={() => setActiveTab("contacts")} className="btn-primary mt-3 !py-2 !px-3.5 text-[13px]">
          Browse contacts
        </button>
      ),
    },
    contacts: {
      title: "No contacts found",
      body: "There's no one else here yet.",
      action: null,
    },
    search: {
      title: "No matches",
      body: "Try a different name or search term.",
      action: null,
    },
  }[variant];

  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-surface-raised border border-border">
        <Icon className="size-5 text-ink-tertiary" />
      </div>
      <h4 className="text-[13.5px] font-medium text-ink-primary">{copy.title}</h4>
      <p className="mt-1 max-w-[220px] text-xs text-ink-tertiary">{copy.body}</p>
      {copy.action}
    </div>
  );
}

export default EmptyListState;
