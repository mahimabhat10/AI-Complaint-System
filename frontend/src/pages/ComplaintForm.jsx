import React, { useState } from "react";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const generateRecommendation = () => {
    const text = `${title} ${description} ${category}`.toLowerCase();

    if (text.includes("lift")) {
      return "Send technician for lift maintenance.";
    }

    if (text.includes("power") || text.includes("electricity")) {
      return "Check transformer and restore power supply.";
    }

    if (text.includes("water")) {
      return "Inspect water pipeline immediately.";
    }

    return "Issue forwarded to concerned department.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aiSuggestion = generateRecommendation();
    setRecommendation(aiSuggestion);
  };

  return (
    <div className="container">
      <h1>Complaint Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Submit Complaint
        </button>
      </form>

      {recommendation && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Recommendation:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintForm;