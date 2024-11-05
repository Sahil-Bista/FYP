import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router";
import {} from "lodash";
import axios from "axios";
import notificationSound from "./assets/notification.mp3";

const socket = io("http://localhost:3001");

function Chat() {
  const audio = new Audio(notificationSound);
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const myUserId = localStorage.getItem("userId");
  const { userId = "" } = useParams();

  const roomId = [userId, myUserId].sort().join("");

  const messageHandler = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setCurrentMessage(" ");
  };

  const sendMessage = () => {
    if (!currentMessage || !roomId) return;
    socket.emit("message", {
      room: roomId,
      msg: currentMessage,
      sender: myUserId,
      reciever: userId,
    });
    messageHandler({
      senderId: myUserId,
      receiverId: userId,
      message: currentMessage,
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("message", (message) => {
      messageHandler({
        senderId: userId,
        receiverId: myUserId,
        message,
        createdAt: new Date(),
      });
      audio.loop = false;
      audio.volume = 0.5;
      audio.play();
    });

    return () => {
      socket.off("message", (message) =>
        messageHandler({
          senderId: userId,
          receiverId: myUserId,
          message,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/message/${userId}`, { withCredentials: true })
      .then((result) => {
        setMessages(result.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3001/user/${userId}`, { withCredentials: true })
      .then((result) => {
        setCurrentUser(result.data);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div className="App">
      <div
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: "white",
          border: "1px solid black",
        }}
      >
        <h1>{currentUser?.name}</h1>
        <h4>{currentUser?.email}</h4>
      </div>
      <div className="messages">
        {messages.map(({ message, senderId, createdAt }, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "70%",
              justifyContent: senderId == myUserId ? "right" : "left",
              width: "fit-content",
              justifySelf: senderId == myUserId ? "right" : "left",
              padding: "10px",
            }}
          >
            {createdAt && (
              <span
                style={{
                  display: "flex",
                  fontSize: "7px",
                  justifyContent: senderId == myUserId ? "right" : "left",
                  justifySelf: senderId == myUserId ? "right" : "left",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                {new Date(createdAt).getFullYear() +
                  " " +
                  (new Date(createdAt).getHours() > 12
                    ? new Date(createdAt).getHours() - 12
                    : new Date(createdAt).getHours()) +
                  ":" +
                  new Date(createdAt).getMinutes()}
              </span>
            )}
            <div
              key={index}
              style={{
                backgroundColor: senderId == myUserId ? "#007bff" : "lightgray",
                color: senderId == myUserId ? "white" : "black",
                borderRadius: "10px",
                padding: ".5rem",
              }}
              className="message"
            >
              {message}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "sticky",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <input
          type="text"
          className="input-wrapper"
          placeholder="Type your message here"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          style={{
            flex: 1, // Make the input take up all available space
            marginRight: "10px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
