import React, { useState } from "react";

function ComplaintForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [recommendation, setRecommendation] = useState("");

  // AI Recommendation Function
  const generateRecommendation = (text) => {
    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("power") ||
      lowerText.includes("electricity")
    ) {
      return "Check transformer and restore power supply.";
    }

    else if (lowerText.includes("water")) {
      return "Inspect pipeline and resolve water supply issue.";
    }

    else if (lowerText.includes("lift")) {
      return "Send technician for lift maintenance.";
    }

    else if (lowerText.includes("garbage")) {
      return "Assign cleaning staff to clean the area.";
    }

    else if (lowerText.includes("road")) {
      return "Road repair team inspection required.";
    }

    else {
      return "Issue forwarded to concerned department.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aiSuggestion = generateRecommendation(
      title + " " + description + " " + category
    );

    setRecommendation(aiSuggestion);

    alert("Complaint Submitted Successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Complaint Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Complaint Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
            height: "100px",
          }}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            padding: "10px",
            width: "300px",
          }}
        />

        <button type="submit">
          Submit Complaint
        </button>
      </form>

      {recommendation && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <h3>AI Recommendation</h3>

          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
}

export default ComplaintForm;