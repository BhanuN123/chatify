function AuthField({ label, icon, type = "text", value, onChange, placeholder, autoComplete }) {
  const Icon = icon;
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-ink-secondary">{label}</label>
      <div className="relative">
        <Icon className="field-icon" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="field"
        />
      </div>
    </div>
  );
}

export default AuthField;
