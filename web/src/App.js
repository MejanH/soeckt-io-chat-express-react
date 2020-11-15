import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

//this connects the socketio server from express api with having cors permission
const socket = io.connect("http://localhost:5000");

function App() {
  const [data, setData] = useState({ name: "", message: "" });
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // this retrieve message connection data from server api
    socket.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });

  function onFormSubmit(e) {
    e.preventDefault();
    const { name, message } = data;
    // this sends data to api server and then the on method retrieves it like
    // the useEffect function. So, the chat array will have new object with the new message
    socket.emit("message", { name, message });

    setData({ message: "", name: "" });
  }
  function onTextChange(e) {
    // this sets name and message value to data.
    // it runs twice because we are using on two inputs
    // so the data will have the current name and message value
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
