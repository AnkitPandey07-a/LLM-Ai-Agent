import React, { useState } from 'react';
import axios from 'axios';
import "../components/styles/App.css";

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [chat, setChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:4000/api/chat',
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = res.data;

      if (data.reply) {
          setResponse(data.reply);
        setChat(true);
        setLoading(false);
        console.log(data.reply);
      }
    } catch (error) {
      console.error('Error while sending request', error.message);
      
    }
  };

  return (
    <div className="main-container">
      <h1>💬 Chat Interface</h1>

      <form onSubmit={handleChatSubmit}>
        <label htmlFor="message">User's Query:</label>
        <textarea
          id="message"
          rows="4"
          placeholder="Type your question here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {chat && !loading && (
        <div className="chat-box">
          <div className="chat-message user">
            <strong>You:</strong> {message}
          </div>
          <div className="chat-message bot">
            <strong>AI:</strong> {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
