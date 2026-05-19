import React, { useState } from "react";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  const generateRecommendation = () => {
    const text = `${title} ${description} ${category}`.toLowerCase();

    if (text.includes("lift")) {
      return "Send technician for lift maintenance.";
    }

    if (
      text.includes("power") ||
      text.includes("electricity")
    ) {
      return "Check transformer and restore power supply.";
    }

    if (text.includes("water")) {
      return "Inspect water pipeline immediately.";
    }

    if (text.includes("garbage")) {
      return "Assign cleaning staff immediately.";
    }

    if (text.includes("road")) {
      return "Road repair team inspection required.";
    }

    return "Issue forwarded to concerned department.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aiSuggestion = generateRecommendation();

    setRecommendation(aiSuggestion);

    const newComplaint = {
      id: Date.now(),
      title,
      description,
      category,
      location,
      recommendation: aiSuggestion,
      status: "Pending",
    };

    setComplaints([...complaints, newComplaint]);

    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
  };

  const markResolved = (id) => {
    const updatedComplaints = complaints.map((complaint) => {
      if (complaint.id === id) {
        return {
          ...complaint,
          status: "Resolved",
        };
      }

      return complaint;
    });

    setComplaints(updatedComplaints);
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
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">
          Submit Complaint
        </button>
      </form>

      {recommendation && (
        <div style={{ marginTop: "20px" }}>
          <h3>AI Recommendation</h3>
          <p>{recommendation}</p>
        </div>
      )}

      <hr />

      <h2>Complaints</h2>

      {complaints.map((complaint) => (
        <div
          key={complaint.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
          }}
        >
          <h3>{complaint.title}</h3>

          <p>
            <strong>Description:</strong>{" "}
            {complaint.description}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {complaint.category}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {complaint.location}
          </p>

          <p>
            <strong>AI Recommendation:</strong>{" "}
            {complaint.recommendation}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {complaint.status === "Resolved"
              ? "✅ Resolved"
              : "⏳ Pending"}
          </p>

          {complaint.status !== "Resolved" && (
            <button
              onClick={() =>
                markResolved(complaint.id)
              }
            >
              Mark Resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintForm;