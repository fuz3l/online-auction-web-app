// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaCreditCard, FaRegCalendarAlt, FaLock } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// const PaymentPage = () => {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cardHolder, setCardHolder] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();




//   const location = useLocation();
//   const amount = location.state?.amount || 0;
  

//   const handlePayment = (e) => {
//     e.preventDefault();

//     if (cardNumber && cvv && expiry && cardHolder) {
//       setSuccess(true);

//       setTimeout(() => {
//         navigate("/"); // Redirect to home or success page
//       }, 6000);
//     } else {
//       alert("Please fill in all fields correctly");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           Secure Payment
//         </h2>

//         {success ? (
//           <div>
//             <img src="/success.gif" alt="Success" className="w-48 h-48" />

//           <div className="text-green-600 font-semibold text-center text-xl">
//             ✅ Payment Successful!
//           </div>
//           </div>
//         ) : (
//           <form onSubmit={handlePayment} className="space-y-5">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Cardholder Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 value={cardHolder}
//                 onChange={(e) => setCardHolder(e.target.value)}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Card Number
//               </label>
//               <div className="relative">
//                 <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   maxLength="19"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                   className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Expiry Date
//                 </label>
//                 <div className="relative">
//                   <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     maxLength="5"
//                     value={expiry}
//                     onChange={(e) => setExpiry(e.target.value)}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   CVV
//                 </label>
//                 <div className="relative">
//                   <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="password"
//                     placeholder="123"
//                     maxLength="4"
//                     value={cvv}
//                     onChange={(e) => setCvv(e.target.value)}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-200"
//             >
//               Pay ₹{amount}
//             </button>

//             <p className="text-sm text-gray-500 text-center mt-3">
//               Your payment is securely processed using 256-bit encryption.
//             </p>
//           </form>
//         )}
//         <div className="flex pt-3 justify-center items-center">
//         <img 
//         src="/razorpay.svg" 
//         className="w-44 " 
//         alt="" />
//       </div>
//       </div>
      
//     </div>
//   );
// };

// export default PaymentPage;


// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaCreditCard, FaRegCalendarAlt, FaLock } from "react-icons/fa";

// const PaymentPage = () => {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [expiry, setExpiry] = useState("");
//   const [cardHolder, setCardHolder] = useState("");
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const amount = location.state?.amount || 0;

//   const handlePayment = (e) => {
//     e.preventDefault();

//     if (cardNumber && cvv && expiry && cardHolder) {
//       setSuccess(true);

//       setTimeout(() => {
//         navigate("/"); // Navigate to homepage or success page
//       }, 5000); // Adjust duration for the success animation
//     } else {
//       alert("Please fill in all fields correctly");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg transition-all duration-500 ease-in-out">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           {success ? "Payment Successful" : "Secure Payment"}
//         </h2>

//         {success ? (
//           <div className="flex flex-col items-center justify-center">
//             <img
//               src="/success.gif"
//               alt="Success"
//               className="w-48 h-48 mb-6 transition-all duration-500"
//             />
//             <p className="text-green-600 text-xl font-semibold text-center">
//               ✅ Thank you! Your payment of ₹{amount} was successful.
//             </p>
//             <p className="text-sm text-gray-500 text-center mt-2">
//               Redirecting you to homepage...
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handlePayment} className="space-y-5">
//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Cardholder Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 value={cardHolder}
//                 onChange={(e) => setCardHolder(e.target.value)}
//                 className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block font-medium text-gray-700 mb-1">
//                 Card Number
//               </label>
//               <div className="relative">
//                 <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9012 3456"
//                   maxLength="19"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                   className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   Expiry Date
//                 </label>
//                 <div className="relative">
//                   <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="MM/YY"
//                     maxLength="5"
//                     value={expiry}
//                     onChange={(e) => setExpiry(e.target.value)}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   CVV
//                 </label>
//                 <div className="relative">
//                   <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="password"
//                     placeholder="123"
//                     maxLength="4"
//                     value={cvv}
//                     onChange={(e) => setCvv(e.target.value)}
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-200"
//             >
//               Pay ₹{amount}
//             </button>

//             <p className="text-sm text-gray-500 text-center mt-3">
//               Your payment is securely processed using 256-bit encryption.
//             </p>
//           </form>
//         )}

//         <div className="flex pt-4 justify-center items-center">
//           <img src="/razorpay.svg" className="w-44" alt="Razorpay Logo" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCreditCard, FaRegCalendarAlt, FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import successAnimation from "../lottie/success.json"; // adjust path as needed

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [upiId, setUpiId] = useState("");
  const amount = location.state?.amount || 0;


  const handlePayment = (e) => {
    e.preventDefault();

    if (cardNumber && cvv && expiry && cardHolder) {
      setSuccess(true);

      setTimeout(() => {
        navigate("/"); // Navigate to homepage or success page
      }, 7000); // Adjust duration for the success animation
    } else {
      alert("Please fill in all fields correctly");
    }
  };


  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg transition-all duration-500 ease-in-out">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {success ? "Payment Successful" : "Secure Payment"}
        </h2>

        {success ? (
          <div className="flex flex-col items-center justify-center">
            <Lottie
              animationData={successAnimation}
              loop={false}
              className="w-56 h-56 mb-6"
            />
            <p className="text-green-600 text-xl font-semibold text-center">
              ✅ Thank you! Your payment of ₹{amount} was successful.
            </p>
            <p className="text-sm text-gray-500 text-center mt-2">
              Redirecting you to homepage...
            </p>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  minLength="12"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <div className="relative">
                  <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="123"
                    maxLength="4"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

<div>
  <p className="text-blue-600 m-1.5 font-semibold text-center">Or Pay wit UPI</p>
<div>
              <label className="block font-medium text-gray-700 mb-1">
        UPI ID
              </label>
              <div className="relative">
                <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="yournumber@bankname"
                  maxLength="19"
                  minLength="12"
                
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
</div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Pay ₹{amount}
            </button>
            <p className="text-sm text-gray-500 text-center mt-3">
              Your payment is securely processed using 256-bit encryption.
            </p>
          </form>
        )}

        <div className="flex pt-4 justify-center items-center">
          <img src="/razorpay.svg" className="w-44" alt="Razorpay Logo" />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
