/** @format */

import React, { useState, useEffect } from "react";
import firestore from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const AddFAQItem = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [faqList, setFaqList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "faq"), (snapshot) => {
      const faqData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqList(faqData);
    });

    return () => unsubscribe();
  }, []);

  const createFaqCollection = async () => {
    try {
      const docRef = await addDoc(collection(firestore, "faq"), {
        name: "Anonymous",
        email: "example@example.com",
        question: "Sample question",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating FAQ collection:", error);
      setErrorMessage("Failed to submit question. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createFaqCollection();

      await addDoc(collection(firestore, "faq"), {
        name,
        email,
        question,
      });

      setName("");
      setEmail("");
      setQuestion("");
      setSuccessMessage("Question submitted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error adding FAQ item:", error);
      setErrorMessage("Failed to submit question. Please try again later.");
    }
  };

  return (
    <div className="add-faq-item">
      <h2>Ask your question</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="form-container">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send</button>
      </form>
      <h2>FAQ List</h2>
      <table className="faq-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {faqList.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.question}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddFAQItem;
