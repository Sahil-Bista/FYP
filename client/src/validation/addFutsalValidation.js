import * as Yup from "yup";
  const validFileExtensions = ["image/png", "image/jpeg", "image/jpg"];

  function isValidFileType(fileType) {
    return validFileExtensions.includes(fileType);
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  export const addFutsalValidationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("Image is required")
      .test("File type", "Only png, jpeg and jpg are allowed", (value) => {
        //
        return value && isValidFileType(value[0]?.type);
      })
      .test("File Size", "Max allowed size is 5MB", (value) => {
        return value && value[0]?.size <= MAX_FILE_SIZE;
      }),
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