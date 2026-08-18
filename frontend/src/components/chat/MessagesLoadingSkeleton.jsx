function MessagesLoadingSkeleton() {
  const widths = ["w-40", "w-56", "w-32", "w-48", "w-28", "w-44"];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 px-2">
      {widths.map((w, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div
            className={`h-10 ${w} animate-pulse rounded-2xl ${
              i % 2 === 0 ? "bg-surface-raised" : "bg-accent-soft"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;
