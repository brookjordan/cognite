import { FormEvent, useRef } from "react";
import { useStore } from "./useStore";
import "./InputArea.scss";
import { MESSAGES } from "./FriendsArea";

function InputArea() {
  const input = useRef<HTMLInputElement>(null);
  const { currentFriend, friends, addMessage } = useStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.current) {
      return;
    }

    addMessage(input.current.value);
    input.current.value = "";

    setTimeout(() => {
      const friend = currentFriend;
      if (!friend) {
        return;
      }
      const messageSet = MESSAGES[friend.style];

      addMessage(
        messageSet[Math.floor(Math.random() * messageSet.length)],
        friend
      );
    }, Math.floor(Math.random() * 3000) + 2000);
  };

  return (
    <div className="input-area">
      <form onSubmit={handleSubmit}>
        <input
          ref={input}
          disabled={!currentFriend}
          type="search"
          placeholder={
            currentFriend
              ? `Press enter to send`
              : friends.length
              ? "Choose a friend on the left"
              : "Add a new friend on the left to start chatting"
          }
        />
      </form>
    </div>
  );
}

export default InputArea;
