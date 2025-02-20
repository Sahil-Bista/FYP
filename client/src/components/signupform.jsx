import { signUpValidationSchema } from "../validation/signUpValidation";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
      .post(`http://localhost:3001/api/user/register`, data)
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
          toast.error(message, { theme: "light" });
        } else {
          toast.error("An unexpected error occurred. Please try again.", {
            theme: "light",
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="label-input-radio">
        <label className="label">Register As: </label>
        <div className="radio-options">
          <div className="radio-option">
            <input type="radio" {...register("role")} value="USER" id="user" />
            <label htmlFor="user" className="label">
              User
            </label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              {...register("role")}
              value="PENDING_VENDOR"
              id="vendor"
            />
            <label htmlFor="vendor" className="label">
              Vendor
            </label>
          </div>
        </div>
        {errors.role && <FaExclamationCircle className="exclamation-icon" />}
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
