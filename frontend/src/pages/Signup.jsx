import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
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

      await axios.post(
        "https://ai-complaint-backend-avcn.onrender.com/api/auth/signup",
        formData
      );

      alert("Signup Successful");

      window.location.href = "/login";

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h1 className="title">
          Create Account
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
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="input"
          />

          <button
            type="submit"
            className="button"
          >
            Signup
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            style={{
              color: "#7b2cbf",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            Login Here
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;