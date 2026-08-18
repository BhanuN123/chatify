function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-10.5 shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-accent" : "bg-surface-hover border border-border"
      }`}
    >
      <span
        className={`inline-block size-4.5 transform rounded-full bg-white shadow-soft transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export default Switch;
