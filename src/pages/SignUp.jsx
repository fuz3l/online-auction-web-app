

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { db } from "../services/firebase"; // Import Firestore database
import { setDoc, doc } from "firebase/firestore";
import Footer from "../components/Footer";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send Email Verification
      await sendEmailVerification(user);

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        mobileNumber,
        email,
        uid: user.uid,
        emailVerified: false,
      });

      alert("Signup successful! Check your email for a verification link.");
      navigate("/login"); // Redirect to verification page
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please log in or use another email.");
      } else {
        console.error("Signup Error:", error.message);
        alert(error.message);
      }
    }
  };

  return (
    <div className="auth-container ">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignUp}>
          <input className="text-red-500 login-input rounded-full" type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} required />
          <input className="text-red-500 login-input rounded-full" type="tel" placeholder="Mobile Number" onChange={(e) => setMobileNumber(e.target.value)} required />
          <input className="text-red-500 login-input rounded-full" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input className="text-red-500 login-input rounded-full" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button className="login-btn  bg-red-600 hover:bg-red-700 rounded-full" type="submit">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
