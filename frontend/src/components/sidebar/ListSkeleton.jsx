function ListSkeleton({ collapsed }) {
  return (
    <div className="space-y-1 px-2.5 py-1">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-3 rounded-xl px-2.5 py-2 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="size-10 shrink-0 animate-pulse rounded-full bg-surface-hover" />
          {!collapsed && (
            <div className="flex-1 space-y-2">
              <div
                className="h-3 animate-pulse rounded bg-surface-hover"
                style={{ width: `${55 + ((i * 13) % 30)}%` }}
              />
              <div className="h-2.5 w-1/3 animate-pulse rounded bg-surface-hover/70" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListSkeleton;
