import { loginValidationSchema } from "../validation/loginValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

export const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

  const onSubmit = async (data) => {
    await axios
      .post(
        "http://localhost:3001/api/user/login",
        { data },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        if (result.data.data === "Success") {
          localStorage.setItem("userId", result.data.userId);
          localStorage.setItem("userRole", result.data.userRole);
          if (result.data.userRole === "VENDOR") {
            navigate("/vendor-landing");
          } else {
            navigate("/");
          }
        } else {
          navigate("/register");
          alert("You are not registered to this service");
        }
      })
      .catch((err) => {
        if (err.response?.data?.msg) {
          const message = err.response.data.msg;
          console.log(message);
          toast.error(message, { autoClose: 5000 });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="label-input">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          placeholder="Enter Email"
          className="input"
        />
        <span className="error">{errors.email?.message}</span>
      </div>
      <div className="label-input">
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="Enter Password"
          className="input"
        />
        <span className="error">{errors.password?.message}</span>
      </div>
      <div className="label-input">
        <label htmlFor="password" className="label">
          Re-type password
        </label>
        <input
          {...register("rePassword")}
          type="password"
          placeholder="Re-type your password"
          className="input"
        />
        <span className="error">{errors.rePassword?.message}</span>
      </div>
      <div>
        <button type="submit" className="login-button">
          Login
        </button>
      </div>
    </form>
  );
};
