import "./chat.scss";

import { useEffect, useState, useRef } from "react";
import format from "timeagojs";

import { useAuth } from "../../context/auth-context";
import { useSocket } from "../../context/socket-context";
import { appAxios } from "../../lib/appAxios";

export const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useAuth();
  const { socket } = useSocket();

  const messageEndRef = useRef();

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await appAxios(`/chats/${id}`);
      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text.trim()) return;

    try {
      const res = await appAxios.post(`/messages/${chat.id}`, { text });
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, res.data],
      }));
      e.target.reset();

      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await appAxios.put(`/chats/read/${chat.id}`);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prevChat) => ({
            ...prevChat,
            messages: [...prevChat.messages, data],
          }));
          read();
        }
      });
    }

    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  // scroll smoothly to messagebox bottom for every new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.length === 0 && <p className="no-messages">No messages yet.</p>}
        {chats?.map((c) => (
          <div
            key={c.id}
            className="message"
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      {chat && (
        <div className="chat-box">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                key={message.id}
                className="chat-message"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};
