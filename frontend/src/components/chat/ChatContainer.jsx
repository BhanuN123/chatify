import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "./ChatHeader";
import EmptyChatState from "./EmptyChatState";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import MessageBubble from "./MessageBubble";
import DateSeparator from "./DateSeparator";

const GROUP_WINDOW_MS = 5 * 60 * 1000;

function isSameDay(a, b) {
  const da = new Date(a);
  const db = new Date(b);
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
}

function buildTimeline(messages) {
  return messages.map((msg, i) => {
    const prev = messages[i - 1];
    const next = messages[i + 1];

    const isNewDay = !prev || !isSameDay(prev.createdAt, msg.createdAt);

    const groupedWithPrev =
      prev &&
      !isNewDay &&
      prev.senderId === msg.senderId &&
      Math.abs(new Date(msg.createdAt) - new Date(prev.createdAt)) < GROUP_WINDOW_MS;

    const groupedWithNext =
      next &&
      isSameDay(msg.createdAt, next.createdAt) &&
      next.senderId === msg.senderId &&
      Math.abs(new Date(next.createdAt) - new Date(msg.createdAt)) < GROUP_WINDOW_MS;

    let position = "single";
    if (groupedWithPrev && groupedWithNext) position = "middle";
    else if (groupedWithPrev) position = "bottom";
    else if (groupedWithNext) position = "top";

    return {
      message: msg,
      showDateSeparator: isNewDay,
      position,
      showAvatar: !groupedWithNext,
    };
  });
}

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const timeline = buildTimeline(messages);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-1">
            {timeline.map(({ message, showDateSeparator, position, showAvatar }) => {
              const isOwn = message.senderId === authUser._id;
              return (
                <div key={message._id}>
                  {showDateSeparator && <DateSeparator date={message.createdAt} />}
                  <div className={position === "single" || position === "top" ? "mt-3" : "mt-0.5"}>
                    <MessageBubble
                      message={message}
                      isOwn={isOwn}
                      position={position}
                      showAvatar={showAvatar}
                      avatarUser={selectedUser}
                    />
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <EmptyChatState name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
