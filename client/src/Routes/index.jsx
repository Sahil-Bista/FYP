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

export const router = createBrowserRouter([
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
