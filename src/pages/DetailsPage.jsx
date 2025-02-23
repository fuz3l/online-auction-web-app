
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { doc, getDoc, updateDoc, collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
// import { db } from "../services/firebase";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const DetailsPage = () => {
//   const { id } = useParams(); // Get the auction item ID from the URL
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [bidAmount, setBidAmount] = useState("");
//   const [bidHistory, setBidHistory] = useState([]);

//   // Fetch auction item details from Firestore
//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const docRef = doc(db, "auction_items", id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setItem({ id: docSnap.id, ...docSnap.data() });
//         } else {
//           console.error("Item not found");
//         }
//       } catch (error) {
//         console.error("Error fetching item:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItem();
//   }, [id]);

//   // Fetch bid history in real-time
//   useEffect(() => {
//     const bidsRef = collection(db, "auction_items", id, "bids");
//     const q = query(bidsRef, orderBy("timestamp", "desc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setBidHistory(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     });

//     return () => unsubscribe();
//   }, [id]);

//   const placeBid = async () => {
//     if (!bidAmount || isNaN(bidAmount) || parseInt(bidAmount) <= item.startingBid) {
//       alert("Enter a valid bid amount higher than the starting bid!");
//       return;
//     }

//     try {
//       const bidRef = collection(db, "auction_items", id, "bids");
//       await addDoc(bidRef, {
//         amount: parseInt(bidAmount),
//         timestamp: new Date(),
//       });
//       setBidAmount("");
//       alert("Bid placed successfully!");
//     } catch (error) {
//       console.error("Error placing bid:", error);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!item) return <div>Item not found</div>;

//   return (
//     <div className="details-page">
//       <Navbar />
//       <div className="cont-details" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
//         <h2>{item.title}</h2>
//         <img src={item.imageUrl} alt={item.title} style={{ width: "100%", maxWidth: "500px", borderRadius: "8px" }} />
//         <p><strong>Description:</strong> {item.description}</p>
//         <p><strong>Starting Bid:</strong> ₹{item.startingBid}</p>
//         <p>
//   <strong>Auction End Time:</strong>{" "}
//   {item.endTime?.toDate
//     ? item.endTime.toDate().toLocaleString()
//     : new Date(item.endTime).toLocaleString()}
// </p>

//         {/* Bidding Section */}
//         <div style={{ marginTop: "20px" }}>
//           <h3>Place a Bid</h3>
//           <input
//             type="number"
//             value={bidAmount}
//             onChange={(e) => setBidAmount(e.target.value)}
//             placeholder="Enter your bid"
//             style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
//           />
//           <button
//             style={{ width: "100%", padding: "10px", backgroundColor: "#7743DB", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
//             onClick={placeBid}
//           >
//             Place Bid
//           </button>
//         </div>

//         {/* Bid History */}
//         <div style={{ marginTop: "20px" }}>
//           <h3>Bid History</h3>
//           <ul>
//             {bidHistory.length > 0 ? (
//               bidHistory.map((bid) => (
//                 <li key={bid.id}>Bid: ₹{bid.amount} - {new Date(bid.timestamp.seconds * 1000).toLocaleString()}</li>
//               ))
//             ) : (
//               <p>No bids yet.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default DetailsPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchBids = () => {
      const q = query(
        collection(db, "bids"),
        where("itemId", "==", id),
        orderBy("timestamp", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        setBids(snapshot.docs.map((doc) => doc.data()));
      });
    };
    const unsubscribe = fetchBids();
    return () => unsubscribe();
  }, [id]);

  const placeBid = async () => {
    if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= item.startingBid) {
      alert("Enter a valid bid higher than the starting bid.");
      return;
    }
    try {
      await addDoc(collection(db, "bids"), {
        itemId: id,
        amount: Number(bidAmount),
        bidderName: "Anonymous",
        timestamp: serverTimestamp(),
      });
      setBidAmount("");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (!item) return <div className="flex justify-center items-center h-screen text-xl">Item not found</div>;

  return (
    <>
     <Navbar />
    <div className="h-screen flex justify-center items-center bg-gray-100 text-gray-900">
      
      <div className="container h-screen flex justify-center items-center mx-auto ">
        <div className="grid  md:grid-cols-2  gap-8 bg-white shadow-lg rounded-xl p-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <img src={item.imageUrl} alt={item.title} className="w-full rounded-lg shadow-md mb-4" />
            <ul className="space-y-2 text-lg">
              <li><strong>Description:</strong> {item.description}</li>
              <li><strong>Starting Bid:</strong> ₹{item.startingBid}</li>
              <li><strong>Auction Ends:</strong> {item.endTime?.toDate ? item.endTime.toDate().toLocaleString() : new Date(item.endTime).toLocaleString()}</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Place a Bid</h3>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Enter your bid"
              className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={placeBid}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg text-lg hover:bg-indigo-700 transition duration-200"
            >
              Place Bid
            </button>
            <h3 className="text-2xl font-semibold mt-6">Bid History</h3>
            {bids.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {bids.map((bid, index) => (
                  <li key={index} className="p-3 border mb-2 rounded-lg shadow-sm bg-white">
                    <strong>{bid.bidderName}</strong>: ₹{bid.amount} - {bid.timestamp?.toDate ? bid.timestamp.toDate().toLocaleString() : "Just now"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-2">No bids yet.</p>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
  </>
  );
};

export default DetailsPage;
