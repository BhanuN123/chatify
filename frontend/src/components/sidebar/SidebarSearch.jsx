import { SearchIcon, XIcon } from "lucide-react";

function SidebarSearch({ value, onChange, placeholder = "Search" }) {
  return (
    <div className="relative px-3 py-3">
      <SearchIcon className="pointer-events-none absolute left-6 top-1/2 size-4 -translate-y-1/2 text-ink-tertiary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-surface-raised py-2 pl-9 pr-8 text-[13.5px]
          text-ink-primary placeholder-ink-tertiary transition-colors focus:border-accent focus:outline-none
          focus:ring-2 focus:ring-accent-soft"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink-primary"
          aria-label="Clear search"
        >
          <XIcon className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export default SidebarSearch;
