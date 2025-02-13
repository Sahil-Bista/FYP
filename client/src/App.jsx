import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Use createBrowserRouter
import Signup from "./Signup";
import Login from "./Login";
import Landing from "./Landing";
import Chat from "./chat";
import Payment from "./Payment";
import Success from "./PaymentSuccess";
import Failure from "./PaymentFailure";
import Futsal from "./Futsals";
import BookingList from "./BookingList";
import Futsals from "./Futsal";
import RegistrationChoice from "./RegistrationChoices";
import PendingFutsals from "./PendingFutsals";
import MyFutsal from "./MyFutsal";

// Define your routes
const router = createBrowserRouter([
  { path: "/registerAs", element: <RegistrationChoice /> },
  { path: "/register/:userRole", element: <Signup /> },
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
  { path: "my-futsal", element: <MyFutsal /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
