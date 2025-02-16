import { signUpValidationSchema } from "../validation/signUpValidation";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaExclamationCircle } from "react-icons/fa";
import "../styles/signup.css";

import { yupResolver } from "@hookform/resolvers/yup";
export const SignUp = () => {
  const navigate = useNavigate();
  const { userRole } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpValidationSchema) });

  const onSubmit = async (data) => {
    // console.log(data);
    await axios
      .post(`http://localhost:3001/api/user/register/${userRole}`, data)
      .then((result) => {
        console.log("result", result);
        if (result.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
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
      <ToastContainer />
      <div className="label-input">
        <label className="label" htmlFor="name">
          Username
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Enter Name"
          className="input"
        />
        <span className="error">{errors.name?.message}</span>
      </div>
      <div className="label-input">
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
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
      <div className="agreement-div">
        <input type="checkbox" {...register("terms")} />
        <label className="label">
          I agree to the{" "}
          <Link to="#" className="link">
            Terms Of Use
          </Link>
          {""} and {""}
          <Link to="#" className="link">
            Privacy Policy
          </Link>
          {errors.terms && <FaExclamationCircle className="exclamation-icon" />}
        </label>
      </div>
      <div>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};
