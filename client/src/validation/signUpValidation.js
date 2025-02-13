import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
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
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required(),
    terms: Yup.bool()
      .isTrue("You must agree to the terms and policies")
      .required("You must agree to the terms and policies"),
  });