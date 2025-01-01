import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Use createBrowserRouter
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Chat from "./chat";
import { Booking } from "./Booking";
import Payment from "./Payment";
import Success from "./PaymentSuccess";
import Failure from "./PaymentFailure";
import Futsal from "./Futsals";
import BookingList from "./BookingList";
import Futsals from "./Futsal";

// Define your routes
const router = createBrowserRouter(
  [
    { path: "/register", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/chat/:userId", element: <Chat /> },
    { path: "/futsal", element: <Futsal /> },
    { path: "/futsals", element: <Futsals /> },
    { path: "/booking/:futsalId", element: <Booking /> },
    { path: "/bookingList", element: <BookingList /> },
    { path: "/bookingList/:futsalId", element: <BookingList /> },
    { path: "/payment/:bookingId", element: <Payment /> },
    { path: "/payment-success", element: <Success /> },
    { path: "/payment-failure", element: <Failure /> },
  ]
  // {
  //   future: {
  //     v7_startTransition: true, // Enable the future flag for v7 transition behavior
  //   },
  // }
);

function App() {
  return (
    // Use RouterProvider instead of BrowserRouter
    <RouterProvider router={router} />
  );
}

export default App;
