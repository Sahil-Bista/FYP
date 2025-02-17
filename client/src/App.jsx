import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./Routes";

import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer autoClose={5000} theme="dark" position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
