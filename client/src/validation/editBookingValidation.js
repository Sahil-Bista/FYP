import * as Yup from "yup";
export const editBookingValidationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    contact_number: Yup.string()
      .matches(/^98\d{8}$/, "Invalid Phone Number")
      .required("First name is required"),
    game_date: Yup.date().required("Game date is required"),
    startTime: Yup.date().required("Start time is required"),
    endTime: Yup.date().required("End time is required"),
  });