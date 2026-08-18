import { useRef, useState } from "react";
import { CameraIcon, LogOutIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import Modal from "../ui/Modal";
import Switch from "../ui/Switch";
import Avatar from "../ui/Avatar";

function SettingsModal({ open, onClose }) {
  const { authUser, updateProfile, logout } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setIsUploading(true);
      await updateProfile({ profilePic: base64Image });
      setIsUploading(false);
    };
  };

  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <div className="flex items-center gap-4">
        <button
          className="group relative"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile photo"
        >
          <Avatar src={selectedImg || authUser.profilePic} alt={authUser.fullName} size="xl" />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <CameraIcon className="size-5 text-white" />
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
              <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            </div>
          )}
        </button>
        <div className="min-w-0">
          <h3 className="truncate font-display text-[15px] font-semibold text-ink-primary">
            {authUser.fullName}
          </h3>
          <p className="truncate text-xs text-ink-tertiary">{authUser.email}</p>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="mt-5 space-y-1 border-t border-border pt-4">
        <div className="flex items-center justify-between rounded-lg px-1 py-2">
          <div>
            <p className="text-[13.5px] font-medium text-ink-primary">Sound effects</p>
            <p className="text-xs text-ink-tertiary">Typing clicks and message notifications</p>
          </div>
          <Switch checked={isSoundEnabled} onChange={toggleSound} label="Toggle sound effects" />
        </div>
      </div>

      <button
        onClick={logout}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-2.5
          text-[13.5px] font-medium text-signal-danger transition-colors hover:bg-signal-danger/10"
      >
        <LogOutIcon className="size-4" />
        Log out
      </button>
    </Modal>
  );
}

export default SettingsModal;
