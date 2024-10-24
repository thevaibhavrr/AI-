
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer(""); 

    try {
      // const res = await axios.post("http://localhost:7000/api/ask", { question });
      const res = await axios.post("https://new-palji-backend-1.onrender.com/api/ask", { question });

      
      // const aiResponseParts = res.data.answer.parts || [];
      // const aiResponseText = aiResponseParts.map(part => part.text).join(" ");

      const aiResponseParts = res.data.answer.parts || [];
      let aiResponseText = aiResponseParts.map(part => part.text).join(" ");
      
      // Replace "Gimini" or "gimini" with "pitamass"
      aiResponseText = aiResponseText.replace(/gimini/gi, "Pitamass intelligence ");
      aiResponseText = aiResponseText.replace(/Gimini/gi, "Pitamass intelligence ");
      aiResponseText = aiResponseText.replace(/google/gi, "Pitamass");
      aiResponseText = aiResponseText.replace(/Google/gi, "Pitamass");
      aiResponseText = aiResponseText.replace(/can I/gi, "Pitamass");
      aiResponseText = aiResponseText.replace(/Can I/gi, "Pitamass");
      // aiResponseText = aiResponseText.replace(/I/gi, "Pitamass intelligence");
      setAnswer(aiResponseText); 

    } catch (error) {
      setAnswer("Error fetching AI response. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Pitamaas Logo */}
      <motion.div
        className="logo-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://www.pitamaas.com/logo-dark-mobile.png"
          alt="Pitamaas Logo"
          className="logo"
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Pitamaas intelligence
      </motion.h1>

      {/* Form */}
      <motion.form
        className="form"
        onSubmit={handleAsk}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
      
        <motion.textarea
          id="question"
          className="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          required
          rows="4"
        />
        <motion.button
          type="submit"
          className="ask-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {loading ? "Asking..." : "Ask AI"}
        </motion.button>
      </motion.form>

      {/* Answer */}
      {answer && (
        <motion.div
          className="answer-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p className="answer">
            {answer}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default App;
