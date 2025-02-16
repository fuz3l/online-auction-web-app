import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "auction_items"));
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching auction items:", error);
      }
    };

    fetchAuctionItems();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="dashboard">
      <Navbar />
      <h2>Auction Items</h2>
      <div className="items-grid" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", padding: "20px" }}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="auction-item" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", cursor: "pointer" }} onClick={() => handleItemClick(item.id)}>
              <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }} />
              <h3>{item.title}</h3>
              <p>Starting Bid: ₹{item.startingBid}</p>
            </div>
          ))
        ) : (
          <p>No auction items found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
