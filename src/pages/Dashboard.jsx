// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../services/firebase";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const Dashboard = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAuctionItems = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "auction_items"));
//         const itemsList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setItems(itemsList);
//       } catch (error) {
//         console.error("Error fetching auction items:", error);
//       }
//     };

//     fetchAuctionItems();
//   }, []);

//   const handleItemClick = (id) => {
//     navigate(`/details/${id}`);
//   };

//   return (
//     <>
//         <Navbar />
//     <div className="dashboard mt-26">
  
//       <h2 className="text-center font-bold text-2xl m-3">Dashboard </h2>
//       <div className="items-grid" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", padding: "20px" }}>
//         {items.length > 0 ? (
//           items.map((item) => (
//             <div key={item.id} className="auction-item" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", cursor: "pointer" }} onClick={() => handleItemClick(item.id)}>
//               <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
//               <h3>{item.title}</h3>
//               <p>Starting Bid: ₹{item.startingBid}</p>
//             </div>
//           ))
//         ) : (
//           <p>No auction items found.</p>
//         )}
//       </div>
   
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // Ensure Auth Context is correctly imported

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth(); // Get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not logged in");
      return;
    }

    const fetchAuctionItems = async () => {
      try {
        console.log("Fetching items for user:", user.uid); // Debugging
        const q = query(collection(db, "auction_items"), where("sellerId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log("No items found for this user.");
        }

        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched Items:", itemsList); // Debugging
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching auction items:", error);
      }
    };

    fetchAuctionItems();
  }, [user]); // Run effect when user changes

  const handleItemClick = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "auction_items", id));
        setItems(items.filter((item) => item.id !== id)); // Remove from UI
        console.log("Item deleted:", id);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard mt-26">
        <h2 className="text-center font-bold text-2xl m-3">My Auction Items</h2>
        <div className="items-grid" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", padding: "20px" }}>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="auction-item" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", cursor: "pointer" }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} onClick={() => handleItemClick(item.id)} />
                <h3>{item.title}</h3>
                <p>Starting Bid: ₹{item.startingBid}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No auction items found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
