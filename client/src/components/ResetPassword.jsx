import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPasswordValidationSchema } from "../validation/resetPasswordValidation";
import { useParams } from "react-router";
import "../styles/ResetPassword.css";
import { useNavigate } from "react-router";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log("reset password token", token);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordValidationSchema) });

  const onSubmit = async (data) => {
    await axios
      .post(
        `http://localhost:3001/api/user/reset-password/${token}`,
        { newPassword: data.newPassword },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        toast.success(result.data.msg, {
          theme: "dark",
          autoClose: "5000",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
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
    <div className="main-background-div">
      <div className="black-blur-overlay"></div>
      <div className="page-content">
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: "flex",
                color: "white",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4>Reset password</h4>
              <button
                className="close-button"
                onClick={() => navigate("/login")}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="label-input">
              <label htmlFor="newPassword" className="label">
                New Password
              </label>
              <input
                {...register("newPassword")}
                type="password"
                placeholder="Enter Password"
                className="passwordChange-input"
              />
              <span className="error">{errors.newPassword?.message}</span>
            </div>

            <div className="label-input">
              <label htmlFor="rePassword" className="label">
                Re-type Password
              </label>
              <input
                {...register("rePassword")}
                type="password"
                placeholder="Re-type your password"
                className="passwordChange-input"
              />
              <span className="error">{errors.rePassword?.message}</span>
            </div>

            <div className="button-container">
              <button type="submit" className="Reset-button">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
