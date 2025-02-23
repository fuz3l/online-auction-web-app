import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSignUp}>
        <input className="login-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="login-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button className="login-btn" type="submit">Sign Up</button>
      </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
