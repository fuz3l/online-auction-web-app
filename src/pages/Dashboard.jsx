

// import { useEffect, useState } from "react";
// import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
// import { db } from "../services/firebase";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useAuth } from "../context/AuthContext"; // Ensure Auth Context is correctly imported

// const Dashboard = () => {
//   const [items, setItems] = useState([]);
//   const { user } = useAuth(); // Get logged-in user
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       console.log("User not logged in");
//       return;
//     }

//     const fetchAuctionItems = async () => {
//       try {
//         console.log("Fetching items for user:", user.uid); // Debugging
//         const q = query(collection(db, "auction_items"), where("sellerId", "==", user.uid));
//         const querySnapshot = await getDocs(q);
        
//         if (querySnapshot.empty) {
//           console.log("No items found for this user.");
//         }

//         const itemsList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         console.log("Fetched Items:", itemsList); // Debugging
//         setItems(itemsList);
//       } catch (error) {
//         console.error("Error fetching auction items:", error);
//       }
//     };

//     fetchAuctionItems();
//   }, [user]); // Run effect when user changes

//   const handleItemClick = (id) => {
//     navigate(`/details/${id}`);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this item?")) {
//       try {
//         await deleteDoc(doc(db, "auction_items", id));
//         setItems(items.filter((item) => item.id !== id)); // Remove from UI
//         console.log("Item deleted:", id);
//       } catch (error) {
//         console.error("Error deleting item:", error);
//       }
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="dashboard mt-26">
//         <h2 className="text-center font-bold text-2xl m-3">My Auction Items</h2>
//         <div className="items-grid" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", padding: "20px" }}>
//           {items.length > 0 ? (
//             items.map((item) => (
//               <div key={item.id} className="auction-item" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", cursor: "pointer" }}>
//                 <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} onClick={() => handleItemClick(item.id)} />
//                 <h3>{item.title}</h3>
//                 <p>Starting Bid: ₹{item.startingBid}</p>
//                 <button
//                   onClick={() => handleDelete(item.id)}
//                   style={{
//                     backgroundColor: "red",
//                     color: "white",
//                     padding: "5px 10px",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                     marginTop: "10px",
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No auction items found.</p>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;


import { useEffect, useState, useRef } from "react";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "react-tsparticles";

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const fetchAuctionItems = async () => {
      try {
        const q = query(collection(db, "auction_items"), where("sellerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching auction items:", error);
      }
    };

    fetchAuctionItems();
  }, [user]);

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRefs.current,
          start: "top 90%",
        },
      }
    );
  }, [items]);

  // Removed unused handleItemClick function

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "auction_items", id));
        setItems(items.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Particles options={{ particles: { number: { value: 80 }, move: { speed: 1 }, color: { value: "#ffffff" } } }} className="absolute inset-0 z-0" />
      <div className="dashboard   mt-26 px-6 py-12 bg-gray-900 text-white ">
        <h2 className="text-center text-3xl font-semibold mb-8">My Auction Items</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Tilt key={item.id} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.3} glareColor="#ffffff">
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="border border-gray-700 rounded-lg p-5 shadow-lg bg-gray-800 transition-transform transform hover:scale-105 hover:border-blue-500 hover:ring-2 ring-blue-300 opacity-0"
                >
                  <div className="w-full h-48 overflow-hidden rounded-md">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover rounded-md" />
                  </div>
                  <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm">Starting Bid: ₹{item.startingBid}</p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </Tilt>
            ))
          ) : (
            <p className="text-center text-gray-400">No auction items found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;