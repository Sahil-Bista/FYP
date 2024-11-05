import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import Chat from "./chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:userId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
