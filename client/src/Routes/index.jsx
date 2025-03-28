import { createBrowserRouter } from "react-router-dom";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
import Chat from "../Pages/chat";
import Payment from "../Pages/Payment";
import Success from "../components/PaymentSuccess";
import Failure from "../components/PaymentFailure";
import Futsal from "../Pages/Futsals";
import BookingList from "../Pages/BookingList";
import Futsals from "../Pages/Futsal";
import PendingFutsals from "../Pages/PendingFutsals";
import MyFutsal from "../Pages/MyFutsal";
import ErrorPage from "../Pages/ErrorPage";
import MyBookings from "../Pages/MyBookings";
import VendorLandingPage from "../Pages/VendorLanding";
import AdminLandingPage from "../Pages/AdminLanding";
import { ForgetPassword } from "../components/ForgetPassword";
import { ResetPassword } from "../components/ResetPassword";

export const router = createBrowserRouter([
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <Landing /> },
  { path: "/vendor-landing", element: <VendorLandingPage /> },
  { path: "/admin-landing", element: <AdminLandingPage /> },
  { path: "/chat", element: <Chat /> },
  { path: "/chat/:userId", element: <Chat /> },
  { path: "/reset-password/:token", element: <ResetPassword /> },
  { path: "/futsal", element: <Futsal /> },
  { path: "/futsals/:userId", element: <Futsals /> },
  { path: "/my-bookings", element: <MyBookings /> },
  { path: "/editBookingList/:bookingId", element: <Futsals /> },
  { path: "/bookingList", element: <BookingList /> },
  { path: "/bookingList/:futsalId", element: <BookingList /> },
  { path: "/payment/:bookingId", element: <Payment /> },
  { path: "/payment-success", element: <Success /> },
  { path: "/payment-failure", element: <Failure /> },
  { path: "/pending-futsals", element: <PendingFutsals /> },
  { path: "/my-futsal", element: <MyFutsal /> },
  { path: "/forgot-password", element: <ForgetPassword /> },
  { path: "*", element: <ErrorPage /> },
]);
