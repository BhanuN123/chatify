import Avatar from "../ui/Avatar";

function ConversationItem({ user, online, active, collapsed, onClick, subtitle }) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? user.fullName : undefined}
      className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-100 ${
        collapsed ? "justify-center" : ""
      } ${active ? "bg-accent-soft" : "hover:bg-surface-hover"}`}
    >
      <Avatar src={user.profilePic} alt={user.fullName} online={online} size="md" />

      {!collapsed && (
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`truncate text-[13.5px] font-medium ${
                active ? "text-ink-primary" : "text-ink-primary/90"
              }`}
            >
              {user.fullName}
            </h4>
          </div>
          <p className="truncate text-xs text-ink-tertiary">
            {subtitle || (online ? "Active now" : "Offline")}
          </p>
        </div>
      )}

      {active && !collapsed && <span className="h-5 w-1 shrink-0 rounded-full bg-accent" />}
    </button>
  );
}

export default ConversationItem;
