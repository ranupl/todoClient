import { React, useState } from "react";
import { registerUserAPI } from "../Api/User_service";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userDetail, setuserDetail] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await registerUserAPI(userDetail);
      if (response.success) {
        navigate("/login");
      } else {
        alert(response.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const changeHandler = (e) => {
    setuserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto bg-black">
      <div className="text-center">
        <h1 className="text-white font-semibold text-2xl font-mono title">
          Todo Task Manager
        </h1>
      </div>
      <div className="formContainer">
        <form className="formBox" onSubmit={handleSubmit}>
          <h1 className="heading">Register</h1>
          <p className="para">
            Already have an account ?{" "}
            <Link to="/login">
              <strong className="smallHeading">Login</strong>
            </Link>
          </p>
          <div className="formControl">
            <label className="text-white">First Name : </label>
            <input
              type="text"
              className="inputField"
              placeholder="First Name"
              name="firstname"
              value={userDetail.firstname}
              onChange={changeHandler}
            />
          </div>
          <div className="formControl">
            <label className="text-white">Last Name : </label>
            <input
              type="text"
              className="inputField"
              placeholder="Last Name"
              name="lastname"
              value={userDetail.lastname}
              onChange={changeHandler}
            />
          </div>
          <div className="formControl">
            <label className="text-white"> Email : </label>
            <input
              type="email"
              className="inputField emailfield"
              placeholder="Email"
              name="email"
              value={userDetail.email}
              onChange={changeHandler}
            />
          </div>
          <div className="formControl">
            <label className="text-white">Username : </label>
            <input
              type="text"
              className="inputField field"
              placeholder="Username"
              name="username"
              value={userDetail.username}
              onChange={changeHandler}
            />
          </div>
          <div className="formControl">
            <label className="text-white">Password : </label>
            <input
              type="text"
              className="inputField field"
              placeholder="Password"
              name="password"
              value={userDetail.password}
              onChange={changeHandler}
            />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
