import { useState } from "react";
import { CheckIcon, ClockIcon, CopyIcon } from "lucide-react";
import toast from "react-hot-toast";
import Avatar from "../ui/Avatar";

function radiusFor(isOwn, position) {
  // position: "single" | "top" | "middle" | "bottom"
  const tight = "4px";
  const round = "18px";
  if (isOwn) {
    return {
      borderTopLeftRadius: round,
      borderBottomLeftRadius: round,
      borderTopRightRadius: position === "top" || position === "single" ? round : tight,
      borderBottomRightRadius: position === "bottom" || position === "single" ? round : tight,
    };
  }
  return {
    borderTopRightRadius: round,
    borderBottomRightRadius: round,
    borderTopLeftRadius: position === "top" || position === "single" ? round : tight,
    borderBottomLeftRadius: position === "bottom" || position === "single" ? round : tight,
  };
}

function MessageBubble({ message, isOwn, position, showAvatar, avatarUser }) {
  const [copied, setCopied] = useState(false);
  const time = new Date(message.createdAt).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCopy = async () => {
    if (!message.text) return;
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy message");
    }
  };

  return (
    <div className={`group flex items-end gap-2 ${isOwn ? "flex-row-reverse" : ""}`}>
      <div className="size-7 shrink-0">
        {!isOwn && showAvatar && (
          <Avatar src={avatarUser?.profilePic} alt={avatarUser?.fullName} size="sm" />
        )}
      </div>

      <div className={`flex max-w-[72%] items-center gap-1.5 ${isOwn ? "flex-row-reverse" : ""}`}>
        <div
          style={radiusFor(isOwn, position)}
          className={`relative px-3.5 py-2 text-[14.5px] leading-relaxed shadow-soft ${
            isOwn ? "bg-accent text-white" : "bg-surface-raised text-ink-primary border border-border"
          } ${message.isOptimistic ? "opacity-70" : ""}`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="Shared attachment"
              className="mb-1.5 max-h-64 rounded-lg object-cover"
            />
          )}
          {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}

          <div
            className={`mt-1 flex items-center gap-1 text-[10.5px] ${
              isOwn ? "text-white/70 justify-end" : "text-ink-tertiary"
            }`}
          >
            {message.isOptimistic ? (
              <ClockIcon className="size-3" />
            ) : (
              <span>{time}</span>
            )}
          </div>
        </div>

        {message.text && !message.isOptimistic && (
          <button
            onClick={handleCopy}
            className={`icon-btn size-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${
              copied ? "text-signal-online" : ""
            }`}
            aria-label="Copy message"
            title="Copy message"
          >
            {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          </button>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
