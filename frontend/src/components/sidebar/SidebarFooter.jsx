import { useState } from "react";
import { SettingsIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import Avatar from "../ui/Avatar";
import SettingsModal from "./SettingsModal";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function SidebarFooter({ collapsed }) {
  const { authUser } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSoundToggle = () => {
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
    toggleSound();
  };

  return (
    <>
      <div className={`flex items-center gap-2.5 border-t border-border p-3 ${collapsed ? "flex-col" : ""}`}>
        <button
          onClick={() => setSettingsOpen(true)}
          className={`flex min-w-0 items-center gap-2.5 rounded-xl px-1.5 py-1.5 text-left transition-colors hover:bg-surface-hover ${
            collapsed ? "" : "flex-1"
          }`}
          title="Settings"
        >
          <Avatar src={authUser.profilePic} alt={authUser.fullName} size="md" online pulse />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink-primary">{authUser.fullName}</p>
              <p className="text-[11px] text-signal-online">Active now</p>
            </div>
          )}
        </button>

        <div className={`flex items-center gap-1 ${collapsed ? "" : ""}`}>
          <button
            onClick={handleSoundToggle}
            className="icon-btn size-8"
            aria-label={isSoundEnabled ? "Mute sound effects" : "Enable sound effects"}
            title={isSoundEnabled ? "Mute sound effects" : "Enable sound effects"}
          >
            {isSoundEnabled ? <Volume2Icon className="size-4" /> : <VolumeOffIcon className="size-4" />}
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            className="icon-btn size-8"
            aria-label="Open settings"
            title="Settings"
          >
            <SettingsIcon className="size-4" />
          </button>
        </div>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}

export default SidebarFooter;
