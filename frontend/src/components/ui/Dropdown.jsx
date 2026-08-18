import { useEffect, useRef, useState } from "react";

function Dropdown({ trigger, children, align = "start", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      {trigger(() => setOpen((v) => !v), open)}

      {open && (
        <div
          role="menu"
          className={`absolute z-50 mt-2 min-w-[200px] origin-top-right rounded-xl border border-border
            bg-surface-overlay p-1.5 shadow-floating animate-popIn ${
              align === "end" ? "right-0" : "left-0"
            } ${className}`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ icon: Icon, children, danger = false, ...props }) {
  return (
    <button
      role="menuitem"
      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13.5px] font-medium
        transition-colors duration-100 ${
          danger
            ? "text-signal-danger hover:bg-signal-danger/10"
            : "text-ink-secondary hover:bg-surface-hover hover:text-ink-primary"
        }`}
      {...props}
    >
      {Icon && <Icon className="size-4 shrink-0" />}
      <span className="truncate">{children}</span>
    </button>
  );
}

export default Dropdown;
