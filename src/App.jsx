

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import DetailsPage from "./pages/DetailsPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddAuctionItem from "./pages/AddAuctionItem";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./pages/Payment";
import About from "./pages/About";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/add-item" element={<PrivateRoute><AddAuctionItem /></PrivateRoute>} />

        <Route path="/details/:id" element={<DetailsPage />} />
<Route path="/about-us" element={<About />} />
        <Route path="/payments/:id" element={<Payment />} />

      </Routes>
    </Router>
  );
}

export default App;
