import { XIcon } from "lucide-react";
import { useEffect } from "react";

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md surface-card shadow-floating animate-popIn overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-[15px] font-semibold text-ink-primary">{title}</h2>
          <button onClick={onClose} className="icon-btn size-8" aria-label="Close dialog">
            <XIcon className="size-4.5" />
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>

        {footer && <div className="flex justify-end gap-2 border-t border-border px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
