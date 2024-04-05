import "./chat.scss";

import { useState } from "react";
import format from "timeagojs";

import { useAuth } from "../../context/auth-context";
import { appAxios } from "../../lib/appAxios";

export const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useAuth();

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.length === 0 && <p className="no-messages">No messages yet.</p>}
        {chats?.map((chat) => (
          <div
            key={chat.id}
            className="message"
            style={{
              backgroundColor: chat.seenBy.includes(currentUser.id)
                ? "white"
                : "#fecd514e",
            }}
            onClick={() => handleOpenChat(chat.id, chat.receiver)}
          >
            <img src={chat.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{chat.receiver.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
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
