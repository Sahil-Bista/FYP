import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const { userRole } = useParams();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
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
    console.log(data);
    await axios
      .post(`http://localhost:3001/register/${userRole}`, data)
      .then((result) => {
        if (result.status === 201) {
          navigate("/login");
        }
        if (result.status === 422) {
          setError(result.data.msg); // Invalid email domain error message from backend
          console.log(result.data.msg);
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
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <ToastContainer />
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Sign Up</center>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input {...register("name")} type="text" placeholder="Enter Name" />
            <p style={{ color: "red", paddingBottom: "0px" }}>
              {errors.name?.message}
            </p>
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              {...register("email")}
              type="email"
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
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
