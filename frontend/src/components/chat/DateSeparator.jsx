function formatDateLabel(dateStr) {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
}

function DateSeparator({ date }) {
  return (
    <div className="my-4 flex items-center justify-center">
      <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-ink-tertiary">
        {formatDateLabel(date)}
      </span>
    </div>
  );
}

export default DateSeparator;
