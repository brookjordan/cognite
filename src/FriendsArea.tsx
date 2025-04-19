import { FormEvent, useEffect } from "react";
import { Friend, useStore } from "./useStore";
import "./FriendsArea.scss";

export const MESSAGES = {
  english: [
    "Hey there!",
    "How are you?",
    "Haha, no way!",
    "Are you there?",
    "I like turtles",
  ],
  norwegian: [
    "Hei der!",
    "Hvordan har du det?",
    "Haha, ikke mulig!",
    "Er du der?",
    "Jeg liker skilpadder",
  ],
} as const;

function FriendsArea() {
  const { friends, addFriend, currentFriend, setCurrentFriend, addMessage } =
    useStore();

  useEffect(
    function addRandomMessages() {
      let timeout: number | undefined;
      const addRandomMessage = () => {
        const friend = friends[Math.floor(Math.random() * friends.length)];
        if (!friend) {
          return;
        }
        const messageSet = MESSAGES[friend.style];
        addMessage(
          messageSet[Math.floor(Math.random() * messageSet.length)],
          friend
        );
        timeout = setTimeout(
          addRandomMessage,
          Math.floor(Math.random() * 10000) + 5000
        );
      };

      timeout = setTimeout(() => {
        addRandomMessage();
      }, Math.floor(Math.random() * 10000) + 5000);

      return () => {
        clearTimeout(timeout);
      };
    },
    [addMessage, friends]
  );

  const handleAddFriend = (e: FormEvent) => {
    e.preventDefault();

    const newFriend = addFriend({
      name: prompt("What is thier name?") || "My new friend",
    });
    setCurrentFriend(newFriend);
  };

  const handleFriendClick = (friend: Friend) => () => {
    setCurrentFriend(friend);
  };

  return (
    <div className="friends-area">
      <div className="friends-area__friend-list">
        {friends.length ? (
          friends.map((friend) => {
            const unreadMessages = friend.messages.filter(
              (message) => !message.isRead
            );

            return (
              <button
                key={friend.id}
                type="button"
                className={`friends-area__friend friends-area__friend--is-${
                  friend === currentFriend ? "active" : "background"
                }`}
                onClick={handleFriendClick(friend)}
              >
                {friend.style === "english" ? "🇬🇧" : "🇳🇴"}{" "}
                {unreadMessages.length ? (
                  <span className="friends-area__unread-count">
                    {unreadMessages.length}
                  </span>
                ) : null}{" "}
                <span>{friend.name}</span>
                {currentFriend === friend && <span> &gt;</span>}
              </button>
            );
          })
        ) : (
          <span className="friends-area__no-friends-message">
            No friends yet
          </span>
        )}
      </div>

      <form onSubmit={handleAddFriend} className="friends-area__add-new-form">
        <button>Add friend</button>
      </form>
    </div>
  );
}

export default FriendsArea;
