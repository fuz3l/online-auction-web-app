
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { doc, getDoc, collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, serverTimestamp, getDocs } from "firebase/firestore";
// import { db } from "../services/firebase";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";


// const DetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [item, setItem] = useState(null);
//   const [bids, setBids] = useState([]);
//   const [bidAmount, setBidAmount] = useState("");
//   const [loading, setLoading] = useState(true);

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

//   useEffect(() => {
//     const fetchBids = () => {
//       const q = query(
//         collection(db, "bids"),
//         where("itemId", "==", id),
//         orderBy("timestamp", "desc")
//       );
//       return onSnapshot(q, (snapshot) => {
//         setBids(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       });
//     };
//     const unsubscribe = fetchBids();
//     return () => unsubscribe();
//   }, [id]);

//   const placeBid = async () => {
//     if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= Math.max(item.startingBid, bids[0]?.amount || 0)) {
//       alert("Enter a valid bid higher than the current highest bid.");
//       return;
//     }
//     try {
//       await addDoc(collection(db, "bids"), {
//         itemId: id,
//         amount: Number(bidAmount),
//         bidderName: "user",
//         timestamp: serverTimestamp(),
//       });
//       setBidAmount("");
//     } catch (error) {
//       console.error("Error placing bid:", error);
//     }
//   };

//   const deleteItem = async () => {
//     if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return;

//     try {
//       // Delete all associated bids first
//       const bidsQuery = query(collection(db, "bids"), where("itemId", "==", id));
//       const bidsSnapshot = await getDocs(bidsQuery);
//       bidsSnapshot.forEach(async (bidDoc) => {
//         await deleteDoc(doc(db, "bids", bidDoc.id));
//       });

//       // Delete the auction item
//       await deleteDoc(doc(db, "auction_items", id));

//       alert("Item deleted successfully!");
//       navigate("/"); // Redirect to home after deletion
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   if (loading) return <div className="flex justify-center items-center h-screen text-xl"><img src="/Animation - 1741088382645.gif" alt="" /></div>;
//   if (!item) return <div className="flex justify-center items-center h-screen text-xl">Item not found</div>;

//   return (
//     <>
//       <Navbar />
//       <div className="flex mt-20 justify-center items-center m-6  text-gray-900">
//         <div className="container  flex justify-center items-center mx-auto">
//           <div className="grid md:grid-cols-2 p-12 p gap-8   rounded-xl ">
//             <div>
//               <h2 className="text-3xl  mb-3 font-bold ">{item.title}</h2>
//               <img src={item.imageUrl} alt={item.title} className="w-full rounded-lg shadow-md mb-4" />
//               <ul className="space-y-2 text-lg">
//                 <li><strong>Description:</strong> {item.description}</li>
//                 <li><strong>Starting Bid:</strong> ₹{item.startingBid}</li>
//                 <li><strong>Auction Ends:</strong> {item.endTime?.toDate ? item.endTime.toDate().toLocaleString() : new Date(item.endTime).toLocaleString()}</li>
//               </ul>
//             </div>
//             <div className="bg-gray-100 p-6 rounded-lg ">
//               <h3 className="text-2xl font-semibold mb-4">Place a Bid</h3>
//               <input
//                 type="number"
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 placeholder="Enter your bid"
//                 className="w-full x p-3 border rounded-full mb-4 focus:ring-2 focus:ring-blue-400"
//               />
//               <button
//                 onClick={placeBid}
//                 className="w-full x1 bg-green-500 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition duration-200"
//               >
//                 Place Bid
//               </button>
              
//               <h3 className="text-2xl font-semibold mt-6">Bid History</h3>
//               {bids.length > 0 ? (
//                 <ul className="mt-3 space-y-2">
//                   {bids.map((bid, index) => (
//                     <li key={index} className=" border border-gray-400 p-2 mb-2 rounded-lg shadow-sm bg-white">
//                       <strong>{bid.bidderName}</strong>: ₹{bid.amount} - {bid.timestamp?.toDate ? bid.timestamp.toDate().toLocaleString() : "Just now"}
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500 mt-2">No bids yet.</p>
//               )}
              
//               {/* DELETE BUTTON (Only for Item Owner) */}
//               <button
//                 onClick={deleteItem}
//                 className="w-full  bg-red-600 text-white py-3 rounded-lg text-lg hover:bg-red-700 transition duration-200"
//               >
//                 Delete Item
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default DetailsPage;

//sec

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs, collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";

const DetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

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
    const q = query(
      collection(db, "bids"),
      where("itemId", "==", id),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBids(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [id]);


  const [highestBid, setHighestBid] = useState(null);
const [isHighestBidder, setIsHighestBidder] = useState(false);

useEffect(() => {
  if (bids.length > 0) {
    const highest = bids.reduce((max, bid) => (bid.amount > max.amount ? bid : max), bids[0]);
    setHighestBid(highest);

    if (user && highest.bidderId === user.uid) {
      setIsHighestBidder(true);
    } else {
      setIsHighestBidder(false);
    }
  }
}, [bids, user]);
  // const placeBid = async () => {
  //   if (!user) {
  //     alert("You must be logged in to place a bid.");
  //     return;
  //   }
    
  //   console.log("Placing bid as user:", user.uid);
  

   
  //   if (!bidAmount || isNaN(bidAmount) || Number(bidAmount) <= Math.max(item.startingBid, bids[0]?.amount || 0)) {
  //     alert("Enter a valid bid higher than the current highest bid.");
  //     return;
  //   }
  
  //   try {
  //     const userRef = doc(db, "users", user.uid);
  //     const userSnap = await getDoc(userRef);
  //     const bidderName = userSnap.exists() ? userSnap.data().fullName : "Anonymous";
  
  //     const bidData = {
  //       itemId: id,
  //       amount: Number(bidAmount),
  //       bidderName: bidderName,
  //       bidderId: user.uid,  // 🔹 Important to match Firestore rules
  //       timestamp: serverTimestamp(),
  //     };
  
  //     console.log("Bid Data:", bidData);
  
  //     await addDoc(collection(db, "bids"), bidData);
  
  //     setBidAmount("");
  //   } catch (error) {
  //     console.error("Error placing bid:", error);
  //   }
  // };
  const placeBid = async () => {
    if (!user) {
      alert("You must be logged in to place a bid.");
      return;
    }
  
    console.log("🔹 Placing bid as user:", user.uid);
  
    const bidValue = Number(bidAmount);
    const highestBid = bids.length > 0 ? bids[0].amount : item.startingBid;
  
    if (!bidAmount || isNaN(bidValue) || bidValue <= highestBid) {
      alert("Enter a valid bid higher than the current highest bid.");
      return;
    }
  
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const bidderName = userSnap.exists() ? userSnap.data().fullName : "Anonymous";
  
      const bidData = {
        itemId: id,
        amount: bidValue,
        bidderId: user.uid, // 🔹 Important for Firestore rules
        bidderName,
        timestamp: serverTimestamp(),
      };
  
      console.log("📌 Bid Data:", bidData);
  
      // 🔹 Store the bid in Firestore
      await addDoc(collection(db, "bids"), bidData);
      console.log("✅ Bid placed successfully!");
  
      // 🔹 Update auction item with highest bid info
      const itemRef = doc(db, "auction_items", id);
      await updateDoc(itemRef, {
        highestBid: bidValue,
        highestBidderId: user.uid,
      });
  
      console.log("📌 Auction item updated with highest bid.");
  
      setBidAmount("");
    } catch (error) {
      console.error("❌ Error placing bid:", error);
      alert(`Error placing bid: ${error.message}`);
    }
  };
  


const getRecommendedBid = async (itemId) => {
  try {
    const q = query(
      collection(db, "bids"),
      where("itemId", "==", itemId),
      orderBy("timestamp", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    const bidHistory = querySnapshot.docs.map(doc => doc.data());
    
    if (bidHistory.length === 0) {
      return null; // No previous bids
    }

    const highestBid = bidHistory[bidHistory.length - 1].amount;
    const totalIncrements = bidHistory.reduce((sum, bid, i) => {
      if (i === 0) return sum;
      return sum + (bid.amount - bidHistory[i - 1].amount);
    }, 0);
    
    const avgIncrement = bidHistory.length > 1 ? totalIncrements / (bidHistory.length - 1) : 500;
    return highestBid + avgIncrement;
  } catch (error) {
    console.error("Error getting recommended bid:", error);
    return null;
  }
};

const [recommendedBid, setRecommendedBid] = useState(null);

useEffect(() => {
  const fetchRecommendedBid = async () => {
    const suggestedBid = await getRecommendedBid(id);
    setRecommendedBid(suggestedBid);
  };
  fetchRecommendedBid();
}, [id]);


  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (!item) return <div className="flex justify-center items-center h-screen text-xl">Item not found</div>;

  return (
    <>
      <Navbar />
      <div className="flex mt-20 justify-center items-center m-6 text-gray-900">
        <div className="container flex justify-center items-center mx-auto">
          <div className="grid md:grid-cols-2 p-12 gap-8 rounded-xl">
            <div>
              <h2 className="text-3xl mb-3 font-bold">{item.title}</h2>
              <img src={item.imageUrl} alt={item.title} className="w-full rounded-lg shadow-md mb-4" />
              <ul className="space-y-2 text-lg">
                <li><strong>Description:</strong> {item.description.join(", ")}</li>
                <li><strong>Starting Bid:</strong> ₹{item.startingBid}</li>
                <li><strong>Auction Ends:</strong> {item.endTime?.toDate ? item.endTime.toDate().toLocaleString() : new Date(item.endTime).toLocaleString()}</li>
                <li><strong>Hosted By:</strong> {item.sellerName || "Unknown"}</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Place a Bid</h3>
              {/* <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                className="w-full p-3 border rounded-full mb-4 focus:ring-2 focus:ring-blue-400"
              /> */}
              <input
  type="number"
  value={bidAmount}
  onChange={(e) => setBidAmount(e.target.value)}
  placeholder={recommendedBid ? `Suggested: ₹${recommendedBid}` : "Enter your bid"}
  className="w-full p-3 border rounded-full mb-4 focus:ring-2 focus:ring-blue-400"
/>

              <button
                onClick={placeBid}
                className="w-full bg-green-500 text-white py-3 rounded-lg text-lg hover:bg-green-700 transition duration-200"
              >
                Place Bid
              </button>

       


              <h3 className="text-2xl font-semibold mt-6">Bid History</h3>
              {bids.length > 0 ? (
                <ul className="mt-3  space-y-2">
                  {bids.map((bid, index) => (
                    <li key={index} className="border border-gray-400 p-2 mb-2 rounded-lg shadow-sm bg-white">
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

