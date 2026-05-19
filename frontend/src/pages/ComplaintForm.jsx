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
        "http://localhost:5000/api/complaints",
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Complaint Submitted");

      window.location.href = "/complaints";

    } catch (error) {

      console.log(error);
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
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            onChange={handleChange}
            className="input"
            rows="4"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            className="button"
          >
            Submit Complaint
          </button>

        </form>

      </div>

    </div>
  );
}

export default ComplaintForm;