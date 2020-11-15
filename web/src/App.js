import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [data, setData] = useState({ name: "", message: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  function onFormSubmit(e) {
    e.preventDefault();
    const { name, message } = data;
    socket.emit("message", { name, message });

    setData({ message: "", name: "" });
  }
  function onTextChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
      <h1>Chat App</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => onTextChange(e)}
          value={data.name}
          type="text"
          name="name"
        />
        <label htmlFor="message">Message</label>
        <input
          onChange={(e) => onTextChange(e)}
          value={data.message}
          type="text"
          name="message"
        />
        <button type="submit">Send</button>
      </form>
      <br />
      <hr style={{ width: "700px" }} />
      <br />
      <br />
      <div>
        <h2>Messages</h2>
        {chat.map(({ name, message }, index) => (
          <h3 key={index}>
            {name}: <span>{message}</span>
          </h3>
        ))}
      </div>
    </div>
  );
}

export default App;
