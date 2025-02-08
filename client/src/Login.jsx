import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("password id required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:3001/login", { data }, { withCredentials: true })
      .then((result) => {
        console.log(result);
        if (result.data.data === "Success") {
          localStorage.setItem("userId", result.data.userId);
          localStorage.setItem("userRole", result.data.userRole);
          // if (result.data.userRole == "PENDING_VENDOR") {
          //   navigate(`/futsals/${result.data.userId}`);
          // } else {
          navigate("/home");
          // }
        } else {
          navigate("/registerAs");
          alert("You are not registered to this service");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Login</center>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              {...register("email")}
              type="text"
              placeholder="Enter Email"
            />
            <p style={{ color: "red", paddingBottom: "0px" }}>
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Password"
            />
            <p style={{ color: "red", paddingBottom: "0px" }}>
              {errors.password?.message}
            </p>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Don&apos;t have an account?</p>
        <Link
          to="/registerAs"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
