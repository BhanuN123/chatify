const SIZES = {
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
  xl: "size-16",
};

const DOT_SIZES = {
  sm: "size-2 border-2",
  md: "size-2.5 border-2",
  lg: "size-3 border-[2.5px]",
  xl: "size-3.5 border-[3px]",
};

function Avatar({ src, alt, size = "md", online, pulse = false, className = "" }) {
  return (
    <div className={`relative shrink-0 ${SIZES[size]} ${className}`}>
      <img
        src={src || "/avatar.png"}
        alt={alt || "User avatar"}
        className="size-full rounded-full object-cover bg-surface-raised"
      />
      {typeof online === "boolean" && (
        <span className="absolute -bottom-0 -right-0 flex items-center justify-center">
          {online && pulse && (
            <span
              className="absolute size-2.5 rounded-full bg-signal-online animate-pulseRing"
              aria-hidden="true"
            />
          )}
          <span
            className={`relative rounded-full border-bg ${DOT_SIZES[size]} ${
              online ? "bg-signal-online" : "bg-ink-tertiary/70"
            }`}
            style={{ borderColor: "var(--surface)" }}
            aria-hidden="true"
          />
        </span>
      )}
    </div>
  );
}

export default Avatar;
