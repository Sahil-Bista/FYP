import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Use createBrowserRouter
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Landing from "./Pages/Landing";
import Chat from "./chat";
import Payment from "./Payment";
import Success from "./PaymentSuccess";
import Failure from "./PaymentFailure";
import Futsal from "./Pages/Futsals";
import BookingList from "./Pages/BookingList";
import Futsals from "./Pages/Futsal";
import RegistrationChoice from "./RegistrationChoices";
import PendingFutsals from "./PendingFutsals";
import MyFutsal from "./Pages/MyFutsal";

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
