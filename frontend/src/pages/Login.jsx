import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

      const res = await axios.post(
        "https://ai-complaint-backend-avcn.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container">

      <div className="card">

        <h1 className="title">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit}>

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
            Login
          </button>

        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          New User?{" "}

          <Link
            to="/signup"
            style={{
              color: "#7b2cbf",
              fontWeight: "bold",
              textDecoration: "none"
            }}
          >
            Signup Here
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;