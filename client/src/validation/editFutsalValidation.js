import * as Yup from "yup";
 

  export const editFutsalValidationSchema = Yup.object().shape({
    futsalName: Yup.string().required("Futsal Name is required"),
    addressLink: Yup.string().url().required("Valid address link required"),
    futsalAddress: Yup.string().required("Futsal Address is required"),
    futsalDescription: Yup.string()
      .max(50, "Description cannor exceed 50 characters")
      .required("Futsal Description is required"),
    futsalContact: Yup.string()
      .matches(/^98\d{8}$/, "Invalid Phone Number")
      .required("Valid contact is required"),
  });