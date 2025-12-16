// Based on the insight provided in the last stakeholders meeting
// look into the AWS service for having a built-in AI
// rather than using Gemini (preferred, but Gemini remains a strong viable alternative.)
import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../../services/api';

export default function ChatbotComponent() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }
      ]);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&family=Manrope:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Manrope', sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 24px;
        }

        .chat-container {
          width: min(95vw, 1200px);
          height: 85vh;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-header {
          padding: 22px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
        }

        .chat-title {
          font-family: 'Crimson Pro', serif;
          font-size: 26px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.4px;
        }

        .chat-subtitle {
          font-size: 14px;
          margin-top: 4px;
          color: rgba(255, 255, 255, 0.55);
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .empty-state {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 12px;
          animation: fadeIn 0.6s ease;
        }

        .empty-state h2 {
          font-family: 'Crimson Pro', serif;
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .empty-state p {
          max-width: 420px;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message {
          display: flex;
          gap: 14px;
          max-width: 75%;
          animation: fadeSlide 0.35s ease;
        }

        .message.user {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .message.assistant .message-avatar {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .message.user .message-avatar {
          background: linear-gradient(135deg, #f093fb, #f5576c);
        }

        .message-content {
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 15px;
          line-height: 1.6;
        }

        .message.assistant .message-content {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
        }

        .message.user .message-content {
          background: rgba(102, 126, 234, 0.15);
          border: 1px solid rgba(102, 126, 234, 0.3);
          color: #ffffff;
        }

        .input-container {
          padding: 20px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
        }

        .input-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 12px 14px;
        }

        .chat-textarea {
          flex: 1;
          background: none;
          border: none;
          color: #ffffff;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          resize: none;
          outline: none;
          min-height: 24px;
          max-height: 120px;
        }

        .chat-textarea::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .send-button {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
        }
      `}</style>

      <div className="chat-header">
        <h1 className="chat-title">Care Compass</h1>
        <p className="chat-subtitle">
          Find verified mental health resources through conversation.
        </p>
      </div>

      <div className="messages-container">
        {messages.length === 1 && (
          <div className="empty-state">
            <h2>How are you feeling today?</h2>
            <p>
              You can ask about support resources, coping strategies, or just talk.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
