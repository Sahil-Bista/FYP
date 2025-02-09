import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import playerImage from "./assets/Fairplay.jpg";
import Logo from "./assets/logo.png";

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
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required(),
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
          navigate("/home");
        } else {
          navigate("/registerAs");
          alert("You are not registered to this service");
        }
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          const message = err.response.data.message;
          console.log(message);
          toast.error(message, { autoClose: 5000 });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="image-container"
        style={{
          display: "flex",
          flex: 1,
          borderRight: "2px solid black",
        }}
      >
        <img
          src={playerImage}
          alt="Image Container"
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        className="login-form"
        style={{
          display: "flex",
          flex: 1,
          borderRight: "5px solid black",
          justifyContent: "center",
          backgroundColor: "#0B1B1C",
          maxHeight: "100vh",
          overflowY: "auto",
          paddingBottom: "30px",
          paddingTop: "30px",
        }}
      >
        <ToastContainer />
        <div>
          <div
            style={{
              width: "75px",
              height: "75px",
              zIndex: 1000,
              color: "white",
              margin: "auto",
              marginBottom: "16px",
            }}
          >
            {" "}
            <img
              src={Logo}
              alt="logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "35px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              paddingBottom: "8px",
            }}
          >
            <center>RIVALS FUTSAL</center>
          </h1>
          <h2
            style={{
              color: "white",
              fontSize: "30px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 800,
              marginBottom: "16px",
            }}
          >
            <center>Sign In</center>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                gap: "4px",
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="email"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter Email"
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #7C7C7C",
                  borderRadius: "8px",
                }}
              />
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.email?.message}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                color: "white",
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #7C7C7C",
                  borderRadius: "8px",
                }}
              />
              <span style={{ color: "red", fontSize: "14px" }}>
                {errors.password?.message}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                color: "white",
                marginBottom: "30px",
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}
              >
                Re-type password
              </label>
              <input
                {...register("rePassword")}
                type="password"
                placeholder="Re-type your password"
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #7C7C7C",
                  borderRadius: "8px",
                }}
              />
              <span
                style={{
                  color: "red",
                  fontSize: "14px",
                }}
              >
                {errors.rePassword?.message}
              </span>
            </div>
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: "#324B4B",
                  border: "1px solid #7C7C7C",
                  borderRadius: "12px",
                  width: "400px",
                  height: "40px",
                  color: "white",
                }}
              >
                Login
              </button>
            </div>
          </form>
          <span
            style={{
              color: "white",
              fontSize: "12px",
              paddingLeft: "4px",
              paddingBottom: "30px",
            }}
          >
            Not registered yet?{" "}
            <Link style={{ color: "white" }} to="/registerAs">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
