import "./App.scss";
import FriendsArea from "./FriendsArea";
import InputArea from "./InputArea";
import MessagesArea from "./MessagesArea";

function App() {
  return (
    <div className="app">
      <menu className="app__input">
        <InputArea />
      </menu>
      <aside className="app__friends">
        <FriendsArea />
      </aside>
      <main className="app__messages">
        <MessagesArea />
      </main>
    </div>
  );
}

export default App;
