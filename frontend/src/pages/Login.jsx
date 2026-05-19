import { useState } from "react";
import axios from "axios";

function Login() {

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
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

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

      </div>

    </div>
  );
}

export default Login;