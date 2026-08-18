import { MessageCircleIcon, UsersIcon, ZapIcon } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

const FEATURES = [
  { icon: ZapIcon, label: "Real-time messaging", desc: "Messages arrive instantly over a live connection." },
  { icon: UsersIcon, label: "Presence aware", desc: "See who's online right from your contact list." },
];

const WelcomeScreen = () => {
  const { authUser } = useAuthStore();
  const { setActiveTab } = useChatStore();
  const firstName = authUser?.fullName?.split(" ")[0];

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6 flex size-20 items-center justify-center rounded-3xl bg-accent-soft">
        <span className="absolute inset-0 rounded-3xl bg-accent/20 animate-pulseRing" />
        <MessageCircleIcon className="size-9 text-accent" />
      </div>

      <h2 className="font-display text-2xl font-bold text-ink-primary">
        Welcome back{firstName ? `, ${firstName}` : ""}
      </h2>
      <p className="mt-2 max-w-sm text-[13.5px] text-ink-tertiary">
        Select a conversation from the sidebar, or start something new from your contacts.
      </p>

      <button
        onClick={() => setActiveTab("contacts")}
        className="btn-primary mt-6 !px-5"
      >
        <UsersIcon className="size-4" />
        Browse contacts
      </button>

      <div className="mt-10 grid w-full max-w-sm gap-3">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-left"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-raised">
                <Icon className="size-4 text-ink-secondary" />
              </div>
              <div>
                <p className="text-[12.5px] font-medium text-ink-primary">{feature.label}</p>
                <p className="text-[11.5px] text-ink-tertiary">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WelcomeScreen;
