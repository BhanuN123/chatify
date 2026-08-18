import { SparkleIcon } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";

const SUGGESTIONS = ["👋 Hey, how's it going?", "🤝 Good to connect with you!", "📅 Free to catch up soon?"];

const EmptyChatState = ({ name }) => {
  const { sendMessage } = useChatStore();

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-accent-soft">
        <SparkleIcon className="size-6 text-accent" />
      </div>
      <h3 className="text-[15px] font-semibold text-ink-primary">Say hello to {name}</h3>
      <p className="mt-1.5 max-w-xs text-[13px] text-ink-tertiary">
        This is the start of your conversation. Send a message to break the ice.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage({ text: s, image: null })}
            className="rounded-full border border-border bg-surface-raised px-3.5 py-1.5 text-[12.5px] font-medium
              text-ink-secondary transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyChatState;
