import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import notificationSound from "../assets/notification.mp3";
import "../styles/chat.css";
import ChatHeader from "../components/chatHeader";

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
      .get(`http://localhost:3001/api/user/${userId}`, {
        withCredentials: true,
      })
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
    //showed preventDefault error after adding the function triggering upon enter key press
    if (e) {
      e.preventDefault();
    }
    if (!searchQuery.trim()) {
      console.log("if");
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
    console.log("hi");
    axios
      .post(
        `http://localhost:3001/chat/search`,
        { searchQuery },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data);
        setSearchedUser(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="chat-page-div">
      <div className="header">
        <ChatHeader />
      </div>

      <div className="chat-box-div">
        <div className="messages-div">
          <div className="search-people">
            <input
              type="text"
              placeholder="Search people"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="search-people-input"
            />
            <button onClick={handleSubmit} className="search-user-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="all-messages-div">
            <p>
              <i className="fa-solid fa-message"></i> &nbsp;
              <b>ALL MESSAGES</b>
            </p>
          </div>
          {(searchQuery.trim() ? searchedUser : matchedUsers).map((user) => (
            <div key={user._id}>
              <div
                className="messged-users"
                onClick={() => navigate(`/chat/${user._id}`)}
              >
                <div className="Parent1">
                  <div className="Parent2">
                    <div>
                      <i className="fa-regular fa-circle-user"></i> &nbsp;
                    </div>
                    <div>
                      <p className="user-name">{user.name}</p>
                    </div>
                  </div>
                  {lastMessages[user._id]?.message ? (
                    <div className="last-message-div">
                      <div className="last-message">
                        {lastMessages[user._id]?.message.message}
                      </div>
                      <div className="message-time">
                        {lastMessages[user._id]?.time}
                      </div>
                    </div>
                  ) : (
                    <div className="no-last-message-div">No messages yet</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="right-div">
          {currentUser && (
            <div className="username-box">
              <div className="user-name-profile">
                <i className="fa-regular fa-circle-user"></i>
                &nbsp;&nbsp;
                {currentUser?.name}
              </div>

              <div className="three-dots">
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          )}

          <div className="messages">
            {messages
              .filter(({ type }) => type !== "Room-joined message")
              .map(({ message, senderId, createdAt }, index) => (
                <div
                  key={index}
                  className={
                    senderId === myUserId
                      ? "sent-messages"
                      : "received-messages"
                  }
                >
                  {createdAt && (
                    <span
                      className={
                        senderId === myUserId
                          ? "created-At-div-sender"
                          : "created-At-div-receiver"
                      }
                    >
                      {senderId != myUserId && (
                        <span className="sender-name">
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
                    className={
                      senderId === myUserId
                        ? "chat-box-sender-messages"
                        : "chat-box-receiver-messages"
                    }
                  >
                    {message}
                  </div>
                </div>
              ))}
          </div>

          <div className="bottom-message-sending-div">
            <div className="input-field-divison">
              <input
                type="text"
                className="message-input"
                placeholder="           Type message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button onClick={sendMessage} className="send-message-button">
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
