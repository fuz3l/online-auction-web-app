// import { useEffect, useState } from "react";
// import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
// import { db } from "../services/firebase";
// import { useAuth } from "../context/AuthContext";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const { user } = useAuth();
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!user) return;

//       const q = query(
//         collection(db, "notifications"),
//         where("userId", "==", user.uid),
//         orderBy("timestamp", "desc")
//       );

//       const querySnapshot = await getDocs(q);
//       const fetchedNotifications = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setNotifications(fetchedNotifications);
//     };

//     fetchNotifications();
//   }, [user]);

//   if (!user) {
//     return <p className="text-center mt-10 text-red-500">Please log in to view your profile.</p>;
//   }
//   console.log(user.email);
//   console.log(user.fullName)
//   console.log(user);
  
  

//   return (
//     <>
//       <Navbar />
//       <div className="flex items-center justify-center">
//         <div className="profile-container mb-18 mt-24">
//           <h2 className="text-xl font-bold mb-4">Profile</h2>
//           <div className="flex justify-center items-center">
//             <img src="/user.png" className="w-40 h-40" alt="" />
//           </div>
//           <div className="profile-info">
//             <p><strong>Name:</strong> {user.fullName || "User"}</p>
//             <p><strong>Email:</strong> {user.email}</p>
//           </div>


//           {/* Notifications Section */}
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold">Notifications</h3>
//             {notifications.length === 0 ? (
//               <p>No notifications yet</p>
//             ) : (
//               notifications.map((notification) => (
//                 <div key={notification.id} className="p-3 border-b border-gray-300">
//                   <p>{notification.message}</p>
//                   <small className="text-gray-500">{new Date(notification.timestamp).toLocaleString()}</small>
//                 </div>
//               ))
//             )}
//           </div>
//          <Link to='/dashboard'><div className="hover:bg-red-800 rounded-2xl bg-red-600 text-white font-bold m-2 p-2">
// You Listed Items
//         </div> </Link>
//         </div>
        
//       </div>
     
//       <Footer />
//     </>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";  // Your Firebase config file
import { useAuth } from "../context/AuthContext";  // Your AuthContext
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      // Fetching the user's fullName from Firestore
      const userDocRef = doc(db, "users", user.uid);  // Assuming 'users' collection
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFullName(userData.fullName || "User");  // Fallback if fullName is not available
      }
    };

    fetchUserProfile();
  }, [user]);

  // Fetch notifications (already in place)
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      const fetchedNotifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10 text-red-500">Please log in to view your profile.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="profile-container mb-18 mt-24">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <div className="flex justify-center items-center">
            <img src="/user.png" className="w-40 h-40" alt="User" />
          </div>
          <div className="profile-info">
            <p><strong>Name:</strong> {fullName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          {/* Notifications Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {notifications.length === 0 ? (
              <p>No notifications yet</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="p-3 border-b border-gray-300">
                  <p>{notification.message}</p>
                  <small className="text-gray-500">{new Date(notification.timestamp).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>

          <Link to='/dashboard'>
            <div className="hover:bg-red-800 rounded-2xl bg-red-600 text-white font-bold m-2 p-2">
              You Listed Items
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
