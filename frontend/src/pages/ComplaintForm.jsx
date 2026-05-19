import React, { useState } from "react";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [complaints, setComplaints] = useState([]);

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

    return "Issue forwarded to concerned department.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComplaint = {
      id: Date.now(),
      title,
      description,
      category,
      location,
      recommendation: generateRecommendation(),
      status: "Pending",
    };

    setComplaints([...complaints, newComplaint]);

    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
  };

  const markResolved = (id) => {
    const updated = complaints.map((complaint) => {
      if (complaint.id === id) {
        return {
          ...complaint,
          status: "Resolved",
        };
      }
      return complaint;
    });

    setComplaints(updated);
  };

  const filteredComplaints = complaints.filter((complaint) => {
    return (
      complaint.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase()) &&
      complaint.category
        .toLowerCase()
        .includes(searchCategory.toLowerCase())
    );
  });

  const logout = () => {
    alert("Logged Out");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eee4f7",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "#7b2cbf" }}>
            Smart Complaint System
          </h1>

          <button
            onClick={logout}
            style={{
              background: "#7b2cbf",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Complaint Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
            style={{
              ...inputStyle,
              height: "100px",
            }}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Submit Complaint
          </button>
        </form>

        <hr style={{ margin: "30px 0" }} />

        <h2 style={{ color: "#7b2cbf" }}>
          Search Complaints
        </h2>

        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) =>
            setSearchLocation(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Search by Category"
          value={searchCategory}
          onChange={(e) =>
            setSearchCategory(e.target.value)
          }
          style={inputStyle}
        />

        <h2 style={{ color: "#7b2cbf" }}>
          Complaints List
        </h2>

        {filteredComplaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "20px",
                background: "#fafafa",
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
                {complaint.status === "Resolved" ? (
                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    ✅ Resolved
                  </span>
                ) : (
                  <span
                    style={{
                      color: "orange",
                      fontWeight: "bold",
                    }}
                  >
                    ⏳ Pending
                  </span>
                )}
              </p>

              {complaint.status !== "Resolved" && (
                <button
                  onClick={() =>
                    markResolved(complaint.id)
                  }
                  style={buttonStyle}
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  background: "#7b2cbf",
  color: "white",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
};

export default ComplaintForm;