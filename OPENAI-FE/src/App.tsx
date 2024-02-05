import { useState } from "react";
import "./App.css";

function App() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweet }),
      });

      const data = await res.json();
      setSentiment(data.sentiment);
    } catch (e) {
      console.error("Error", e);
    }
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => {
            setTweet(e.target.value);
            setSentiment("");
          }}
          placeholder="Paste your Tweet Here.."
          cols={60}
          rows={15}
        />
      </div>
      <div>
        <button onClick={handleClick}>Check</button>
      </div>
      {sentiment != "" ? (
        <h5>The sentiment of your Tweet is {sentiment}</h5>
      ) : (
        <h5>Submit Your Tweet</h5>
      )}
    </div>
  );
}

export default App;
