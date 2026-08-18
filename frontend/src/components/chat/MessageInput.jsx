import { useEffect, useRef, useState } from "react";
import useKeyboardSound from "../../hooks/useKeyboardSound";
import { useChatStore } from "../../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MAX_TEXTAREA_HEIGHT = 160;

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [text]);

  // reset composer state whenever the active conversation changes
  useEffect(() => {
    setText("");
    setImagePreview(null);
  }, [selectedUser?._id]);

  const readImageFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleImageChange = (e) => readImageFile(e.target.files[0]);

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) readImageFile(file);
  };

  return (
    <div
      className={`shrink-0 border-t border-border bg-surface px-4 py-3 md:px-6 transition-colors ${
        isDragging ? "bg-accent-soft" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {imagePreview && (
        <div className="mx-auto mb-2.5 flex max-w-3xl items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Attachment preview"
              className="h-16 w-16 rounded-lg border border-border object-cover"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full
                bg-surface-overlay border border-border text-ink-secondary hover:text-ink-primary"
              aria-label="Remove attachment"
            >
              <XIcon className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border
          bg-surface-raised p-1.5 pl-2 transition-colors focus-within:border-accent/50 focus-within:ring-2
          focus-within:ring-accent-soft"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`icon-btn mb-0.5 size-9 shrink-0 ${imagePreview ? "text-accent" : ""}`}
          aria-label="Attach image"
          title="Attach image"
        >
          <ImageIcon className="size-4.5" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomKeyStrokeSound();
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${selectedUser.fullName.split(" ")[0]}`}
          className="max-h-40 flex-1 resize-none bg-transparent py-2 text-[14.5px] text-ink-primary
            placeholder-ink-tertiary focus:outline-none"
        />

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-white
            transition-all hover:bg-accent-hover active:scale-95 disabled:opacity-40 disabled:hover:bg-accent
            disabled:active:scale-100"
          aria-label="Send message"
        >
          <SendIcon className="size-4" />
        </button>
      </form>
      <p className="mx-auto mt-1.5 max-w-3xl text-center text-[10.5px] text-ink-tertiary">
        Enter to send &middot; Shift + Enter for a new line
      </p>
    </div>
  );
}
export default MessageInput;
