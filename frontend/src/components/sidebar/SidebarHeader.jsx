import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

function SidebarHeader({ collapsed, onToggle }) {
  return (
    <div
      className={`flex h-16 shrink-0 items-center border-b border-border px-4 ${
        collapsed ? "justify-center px-0" : "justify-between"
      }`}
    >
      {!collapsed && (
        <div className="flex items-center gap-2.5 animate-fadeIn">
          <div className="relative flex size-8 items-center justify-center rounded-lg bg-accent">
            <span className="absolute inset-0 rounded-lg bg-accent animate-pulseRing opacity-60" />
            <span className="relative font-display text-sm font-bold text-white">C</span>
          </div>
          <span className="font-display text-[15px] font-bold tracking-tight text-ink-primary">
            Chatify
          </span>
        </div>
      )}

      <button
        onClick={onToggle}
        className="icon-btn size-8 hidden md:inline-flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpenIcon className="size-4.5" />
        ) : (
          <PanelLeftCloseIcon className="size-4.5" />
        )}
      </button>
    </div>
  );
}

export default SidebarHeader;
