import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DetailsPage = () => {
  const { id } = useParams(); // Get the auction item ID from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch auction item details from Firestore
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "auction_items", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Item not found");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();

  }, [id]);


  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="details-page">
      <Navbar />
      <div className="cont-details">
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <h2>{item.title}</h2>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }}
          />
          <p style={{ marginTop: "20px" }}>
            <strong>Description:</strong> {item.description}
          </p>
          <p>
            <strong>Starting Bid:</strong> ₹{item.startingBid}
          </p>
          <p>
            <strong>Auction End Time:</strong>{" "}
            {item.endTime
              ? item.endTime.toDate
                ? item.endTime.toDate().toLocaleString()
                : new Date(item.endTime).toLocaleString()
              : "N/A"}
          </p>
          {/* Add additional details if you have more fields */}
          {item.extraDetails && (
            <div>
              <h3>Extra Details</h3>
              <p>{item.extraDetails}</p>
            </div>
          )}
          <button
            style={{
              width:"100%",
              marginTop: "30px",
              padding: "10px 20px",
              backgroundColor: "#7743DB",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => {
              // For example, redirect to a bidding page or open a bid modal
              alert("Place Bid functionality coming soon!");
            }}
          >
            Place Bid
          </button>
        </div>
        </div>

        <Footer />
      </div>
    
      );
};

      export default DetailsPage;
