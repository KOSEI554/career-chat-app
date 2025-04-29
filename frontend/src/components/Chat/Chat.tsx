import React, { useState, useRef, FormEvent, useEffect } from "react";
import { Message } from "../../types";
import { chatApi } from "../../service/api";
import "./Chat.css";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 新しいメッセージが追加されたときに自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 初回表示時に挨拶メッセージを表示
  useEffect(() => {
    setMessages([
      {
        text: "こんにちは！私は七字晃正です。私のスキルや経験について質問してください。",
        sender: "bot",
      },
    ]);
  }, []);

  // テキストエリアの高さを自動調整
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${Math.min(
        textAreaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [inputText]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // ユーザーメッセージを追加
    const userMessage: Message = { text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // テキストエリアの高さをリセット
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
    }

    try {
      // APIを呼び出し
      const response = await chatApi.sendMessage(inputText);

      // ボットの応答を追加
      const botMessage: Message = {
        text: response.response,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);

      const errorMessage: Message = {
        text: "エラーが発生しました。後でもう一度お試しください。",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      form?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message-container ${message.sender}`}>
            <div className={`avatar ${message.sender}`}>
              {message.sender === "bot" ? "🤖" : "👤"}
            </div>

            <div className="message-content">
              <div className={`message ${message.sender}`}>{message.text}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-container bot">
            <div className="avatar bot">🤖</div>

            <div className="message-content">
              <div className="message bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="chat-input-form">
        <textarea
          ref={textAreaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メッセージを入力..."
          disabled={isLoading}
          rows={1}
        />

        <button type="submit" disabled={isLoading || !inputText.trim()}>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="send-icon"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
