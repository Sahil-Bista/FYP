import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Use createBrowserRouter
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Chat from "./Pages/chat";
import Payment from "./Pages/Payment";
import Success from "./components/PaymentSuccess";
import Failure from "./components/PaymentFailure";
import Futsal from "./Pages/Futsals";
import BookingList from "./Pages/BookingList";
import Futsals from "./Pages/Futsal";
import PendingFutsals from "./PendingFutsals";
import MyFutsal from "./Pages/MyFutsal";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter([
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Landing /> },
  { path: "/chat/:userId", element: <Chat /> },
  { path: "/futsal", element: <Futsal /> },
  { path: "/futsals/:userId", element: <Futsals /> },
  { path: "/editBookingList/:bookingId", element: <Futsals /> },
  { path: "/bookingList", element: <BookingList /> },
  { path: "/bookingList/:futsalId", element: <BookingList /> },
  { path: "/payment/:bookingId", element: <Payment /> },
  { path: "/payment-success", element: <Success /> },
  { path: "/payment-failure", element: <Failure /> },
  { path: "/pending-futsals", element: <PendingFutsals /> },
  { path: "/my-futsal", element: <MyFutsal /> },
  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return (
    <>
      <ToastContainer autoClose={5000} theme="dark" position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
