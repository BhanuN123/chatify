function PageLoader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-bg-canvas">
      <div className="relative flex size-12 items-center justify-center rounded-2xl bg-accent">
        <span className="absolute inset-0 rounded-2xl bg-accent animate-pulseRing opacity-60" />
        <span className="relative font-display text-lg font-bold text-white">C</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-ink-tertiary animate-typingBounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
export default PageLoader;
