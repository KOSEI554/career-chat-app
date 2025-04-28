import React, { useState, FormEvent } from "react";
import axios from "axios";
import { Message, ChatResponse } from "../../types";
import "./Chat.css";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // ユーザーメッセージを追加
    const userMessage: Message = { text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // APIを呼び出し
      const response = await axios.get<{ response: string }>(
        "http://localhost:8080/api/chat",
        {
          params: { message: inputText },
        }
      );

      // ボットの応答を追加
      const botMessage: Message = {
        text: response.data.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        text: "エラーが発生しました。",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>キャリアチャットボット</h2>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.text}</div>
          </div>
        ))}
        {isLoading && <div className="message bot">考え中...</div>}
      </div>

      <form onSubmit={sendMessage} className="chat-input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="質問を入力してください..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          送信
        </button>
      </form>
    </div>
  );
};

export default Chat;
