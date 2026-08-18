import { ImageIcon, MessageCircleIcon, ZapIcon } from "lucide-react";

const FEATURES = [
  { icon: ZapIcon, text: "Real-time delivery over a live socket connection" },
  { icon: MessageCircleIcon, text: "See who's online before you say hi" },
  { icon: ImageIcon, text: "Share photos right inside the conversation" },
];

function AuthBrandPanel() {
  return (
    <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-surface p-12 md:flex">
      {/* ambient signal rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative size-[420px]">
          <span className="absolute inset-0 rounded-full border border-border" />
          <span className="absolute inset-[60px] rounded-full border border-border" />
          <span className="absolute inset-[120px] rounded-full border border-accent/20" />
          <span className="absolute inset-[170px] rounded-full bg-accent/10 animate-pulseRing" />
          <span className="absolute inset-[178px] flex items-center justify-center rounded-full bg-accent shadow-glow">
            <MessageCircleIcon className="size-8 text-white" />
          </span>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-accent">
          <span className="font-display text-sm font-bold text-white">C</span>
        </div>
        <span className="font-display text-[15px] font-bold tracking-tight text-ink-primary">Chatify</span>
      </div>

      <div className="relative z-10 max-w-sm">
        <h1 className="font-display text-3xl font-bold leading-tight text-ink-primary">
          Conversations, in real time.
        </h1>
        <p className="mt-3 text-[14px] text-ink-tertiary">
          A focused space for messaging your contacts — instant delivery, live presence, no clutter.
        </p>

        <ul className="mt-8 space-y-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <li key={feature.text} className="flex items-center gap-3 text-[13px] text-ink-secondary">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-raised border border-border">
                  <Icon className="size-3.5 text-accent" />
                </span>
                {feature.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AuthBrandPanel;
