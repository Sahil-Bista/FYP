import * as Yup from "yup";

export const resetPasswordValidationSchema = Yup.object().shape({
    newPassword: Yup.string().required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
      .required(),
  });
  