import { useStore } from "./useStore";
import "./MessagesArea.scss";
import { useEffect, useRef } from "react";

function MessagesArea() {
  const messagesArea = useRef<HTMLDivElement>(null);
  const { currentFriend, friends } = useStore();
  const isAtBottom = useRef(true);

  useEffect(
    function scrollToBottomOnNewMessage() {
      if (!currentFriend?.messages.length) {
        return;
      }

      if (isAtBottom.current) {
        messagesArea.current?.scrollTo(0, messagesArea.current.scrollHeight);
      }
    },
    [currentFriend?.messages.length]
  );

  const handleMessageScroll = () => {
    if (!messagesArea.current) {
      return;
    }

    isAtBottom.current =
      messagesArea.current.scrollHeight - messagesArea.current.scrollTop ===
      messagesArea.current.clientHeight;
  };

  return (
    <div
      className="messages-area"
      ref={messagesArea}
      onScroll={handleMessageScroll}
    >
      {!friends.length
        ? "Add your first friend on the left!"
        : currentFriend?.messages.length
        ? currentFriend.messages.map((message) => (
            <div
              key={message.id}
              className={`messages-area__message messages-area__message--${
                message.sender ? "from-them" : "from-me"
              }`}
              title={String(new Date(message.date))}
            >
              {message.text}
            </div>
          ))
        : currentFriend
        ? "Send your first message!"
        : "No friend selected"}
    </div>
  );
}

export default MessagesArea;
