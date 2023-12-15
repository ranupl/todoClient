import React, { useState } from "react";
import { loginUserAPI } from "../Api/User_service";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        alert("Field can't be empty");
        return;
      }
      let response = await loginUserAPI(email, password);
      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/todos");
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="container mx-auto bg-black">
        <div className="text-center">
          <h1 className="text-white font-semibold text-2xl font-mono title">
            Todo Task Manager
          </h1>
        </div>
        <div className="formContainer">
          <form className="formBox" onSubmit={handleSubmit}>
            <h1 className="heading">Login</h1>
            <p className="para">
              Don't have an account ?{" "}
              <Link to="/">
                <strong className="smallHeading">Register</strong>
              </Link>
            </p>
            <div className="formControl">
              <label className="text-white"> Email : </label>
              <input
                type="email"
                className="inputField emailfield"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="formControl">
              <label className="text-white">Password : </label>
              <input
                type="text"
                className="inputField field"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
