import { useState } from "react";
import axios from "axios";

function ComplaintForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: ""
  });

  const [aiResult, setAiResult] = useState(null);

  const BASE_URL =
    "https://ai-complaint-backend-avcn.onrender.com";

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/api/complaints`,
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      // AI ANALYSIS LOGIC

      let priority = "Low";

      let department =
        "General Department";

      let autoResponse =
        "Your complaint has been registered successfully.";

      if (
        formData.description
          .toLowerCase()
          .includes("water")
      ) {

        priority = "High";

        department =
          "Water Department";

        autoResponse =
          "Water department has been notified urgently.";
      }

      else if (
        formData.description
          .toLowerCase()
          .includes("electricity")
      ) {

        priority = "High";

        department =
          "Electricity Department";

        autoResponse =
          "Electricity department will resolve the issue soon.";
      }

      else if (
        formData.description
          .toLowerCase()
          .includes("garbage")
      ) {

        priority = "Medium";

        department =
          "Sanitation Department";

        autoResponse =
          "Sanitation team has been informed.";
      }

      else if (
        formData.description
          .toLowerCase()
          .includes("road")
      ) {

        priority = "Medium";

        department =
          "Road Maintenance Department";

        autoResponse =
          "Road maintenance team will inspect the issue.";
      }

      setAiResult({

        priority,

        department,

        summary:
          formData.description.slice(0, 70) + "...",

        response:
          autoResponse
      });

      alert("Complaint Submitted Successfully");

      setTimeout(() => {

        window.location.href = "/complaints";

      }, 5000);

    } catch (error) {

      console.log(error);

      alert("Error submitting complaint");
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h1 className="title">
          Register Complaint
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            onChange={handleChange}
            className="input"
            required
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            onChange={handleChange}
            className="input"
            rows="4"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Complaint Category"
            onChange={handleChange}
            className="input"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="input"
            required
          />

          <button
            type="submit"
            className="button"
          >
            Submit Complaint
          </button>

        </form>

        {

          aiResult && (

            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                background: "#f3e8ff",
                borderRadius: "15px",
                border:
                  "2px solid #d0bdf4"
              }}
            >

              <h2
                style={{
                  color: "#7b2cbf",
                  marginBottom: "15px"
                }}
              >
                🤖 AI Powered Complaint Analysis
              </h2>

              <p>
                <b>Priority:</b>
                {" "}
                {aiResult.priority}
              </p>

              <p>
                <b>Recommended Department:</b>
                {" "}
                {aiResult.department}
              </p>

              <p>
                <b>Complaint Summary:</b>
                {" "}
                {aiResult.summary}
              </p>

              <p>
                <b>Auto Generated Response:</b>
                {" "}
                {aiResult.response}
              </p>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default ComplaintForm;