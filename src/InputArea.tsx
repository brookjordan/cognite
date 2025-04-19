import { FormEvent, useEffect, useRef, useState } from "react";
import { useStore } from "./useStore";
import "./InputArea.scss";
import { MESSAGES } from "./FriendsArea";

function InputArea() {
  const input = useRef<HTMLInputElement>(null);
  const { currentFriend, friends, addMessage } = useStore();
  const [alt, setAlt] = useState(-1);
  const [previousMessage, setPreviousMessage] = useState("");

  useEffect(
    function focusChatOnFriendChange() {
      if (!currentFriend) {
        return;
      }

      input.current?.focus();
    },
    [currentFriend]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(input.current);
    if (!input.current) {
      return;
    }

    addMessage(input.current.value);
    setPreviousMessage(input.current.value);
    input.current.value = "";
    setAlt((prevAlt) => (prevAlt + 1) % 2);

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
      <form className="input-area__form" onSubmit={handleSubmit}>
        <input
          key="real-input"
          className="input-area__input"
          ref={input}
          disabled={!currentFriend}
          type="search"
          autoFocus
          placeholder={
            currentFriend
              ? `Press enter to send`
              : friends.length
              ? "Choose a friend on the left"
              : "Add a new friend on the left to start chatting"
          }
        />

        {alt > -1 && (
          <input
            readOnly
            type="search"
            className={`input-area__input input-area__alternate-input--no-${alt}`}
            value={previousMessage}
            placeholder={
              currentFriend
                ? `Press enter to send`
                : friends.length
                ? "Choose a friend on the left"
                : "Add a new friend on the left to start chatting"
            }
          />
        )}

        <button>Submit</button>
      </form>
    </div>
  );
}

export default InputArea;
