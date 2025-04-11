import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // Redirect to Home after successful login
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
    <div className="login-container bg-red-200">
   
      <div className="login-card rounded-2xl">
           <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input text-red-500 rounded-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-red-500 login-input rounded-full"
            required
          />
          <button type="submit" className="login-btn bg-red-600 hover:bg-red-700 rounded-full">
            Login
          </button>
        </form>
      </div>

            
    </div>
   <Footer />
    </>
  );
};

export default Login;
