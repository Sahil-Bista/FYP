import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import notificationSound from "./assets/notification.mp3";
import Header from "./Header";

const socket = io("http://localhost:3001");

function Chat() {
  const audio = new Audio(notificationSound);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const myUserId = localStorage.getItem("userId");
  const { userId = " " } = useParams();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState([]);
  const navigate = useNavigate();
  const [lastMessages, setLastMessages] = useState({});

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
    const usersToFetch = searchQuery.trim() ? searchedUser : matchedUsers;

    usersToFetch.forEach((user) => {
      axios
        .get(`http://localhost:3001/message/${user._id}`, {
          withCredentials: true,
        })
        .then((result) => {
          const sortedMessages = result.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          const lastMessage =
            sortedMessages.length > 0 ? sortedMessages[0] : null;

          const formattedTime = lastMessage
            ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : null;

          setLastMessages((prevMessages) => ({
            ...prevMessages,
            [user._id]: {
              message:
                lastMessage && lastMessage.type !== "Room-joined message"
                  ? lastMessage
                  : null,
              time:
                lastMessage && lastMessage.type !== "Room-joined message"
                  ? formattedTime
                  : null,
            },
          }));
        })
        .catch((err) => console.log(err));
    });
  }, [searchedUser, matchedUsers, searchQuery]);

  useEffect(() => {
    socket.emit("join-room", roomId, userId, myUserId);

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
  }, [roomId]);

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

    axios
      .get(`http://localhost:3001/room/${myUserId}`, { withCredentials: true })
      .then((result) => {
        console.log(result);
        setMatchedUsers(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, myUserId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      axios
        .get(`http://localhost:3001/room/${myUserId}`, {
          withCredentials: true,
        })
        .then((result) => {
          console.log(result);
          setMatchedUsers(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    axios
      .post(
        `http://localhost:3001/chat/search`,
        { searchQuery },
        { withCredentials: true }
      )
      .then((result) => {
        setSearchedUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      <Header />
      <div style={{ flex: 1, display: "flex", height: "calc(100vh - 60px)" }}>
        <div
          style={{
            width: "300px",
            borderRight: "1px solid white",
            padding: "10px",
            overflowY: "auto",
            backgroundColor: "#121212",
            color: "#DADADA",
          }}
        >
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search people"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "50px",
                border: "1px solid #4A4B4B",
                marginBottom: "10px",
                color: "#6E7072",
                backgroundColor: "#121212",
              }}
            />
            <button
              onClick={handleSubmit}
              style={{
                position: "absolute",
                top: "40%",
                right: "10px",
                transform: "translateY(-50%)",
                fontSize: "18px",
                color: "#6E7072ii",
                cursor: "pointer",
                background: "none",
                border: "none",
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div
            style={{ padding: "10px", paddingBottom: "0px", fontSize: "12px" }}
          >
            <p>
              <i className="fa-solid fa-message"></i> &nbsp;
              <b>ALL MESSAGES</b>
            </p>
          </div>
          {(searchQuery.trim() ? searchedUser : matchedUsers).map((user) => (
            <div key={user._id}>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/chat/${user._id}`)}
              >
                <div
                  className="Parent1"
                  style={{
                    position: "relative",
                    borderBottom: "1px solid white",
                    height: "60px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    className="parent2"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div>
                      <i className="fa-regular fa-circle-user"></i> &nbsp;
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: "bold" }}>
                        {user.name}
                      </p>
                    </div>
                  </div>
                  {lastMessages[user._id]?.message ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "5px",
                      }}
                    >
                      <div
                        className="lastMessage"
                        style={{
                          fontSize: "12px",
                          color: "#6c757d",
                          marginBottom: "5px",
                          position: "absolute",
                          left: "25px",
                        }}
                      >
                        {lastMessages[user._id]?.message.message}
                      </div>
                      <div
                        className="messageTime"
                        style={{
                          position: "absolute",
                          top: "7px",
                          right: "0px",
                          fontSize: "10px",
                          color: "#aaa",
                          textAlign: "right",
                        }}
                      >
                        {lastMessages[user._id]?.time}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6c757d",
                        position: "absolute",
                        bottom: "15px",
                        left: "25px",
                      }}
                    >
                      No messages yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {currentUser && (
            <div
              className="username-box"
              style={{
                position: "sticky",
                backgroundColor: "#121212",
                padding: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid black",
                color: "#F0F0F0",
                height: "50px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "20px",
                  marginLeft: "20px",
                }}
              >
                <i className="fa-regular fa-circle-user"></i>
                &nbsp;&nbsp;
                {currentUser?.name}
              </div>

              <div style={{ marginRight: "10px" }}>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          )}

          <div
            className="messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px 20px 10px 20px ",
              backgroundColor: "#181818",
            }}
          >
            {messages
              .filter(({ type }) => type !== "Room-joined message")
              .map(({ message, senderId, createdAt }, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "70%",
                    justifyContent: senderId == myUserId ? "right" : "left",
                    width: "fit-content",
                    justifySelf: senderId == myUserId ? "right" : "left",
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
                        color: "#A0A0A0",
                      }}
                    >
                      {senderId != myUserId && (
                        <span
                          style={{
                            paddingRight: "5px",
                            fontSize: "12px",
                            color: "#DADADA",
                          }}
                        >
                          <b>{currentUser?.name}</b>
                        </span>
                      )}
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
                      backgroundColor:
                        senderId == myUserId ? "#007bff" : "lightgray",
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
              boxSizing: "border-box",
              backgroundColor: "#121212",
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                width: "100%",
              }}
            >
              <input
                type="text"
                className="input-wrapper"
                placeholder="           Type message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  fontSize: "16px",
                  color: "#A0A0A0",
                  backgroundColor: "#121212",
                  paddingRight: "50px", // Space for the button on the right
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "45%",
                  transform: "translateY(-50%)", // Center the button vertically
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginTop: "2.25px",
                  padding: "3px",
                  width: "100px",
                }}
              >
                Send &nbsp;
                <i className="fa-regular fa-paper-plane"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
