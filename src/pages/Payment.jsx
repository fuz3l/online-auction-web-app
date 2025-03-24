import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth } from "firebase/auth";

const Payment = () => {
  const { itemId } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemRef = doc(db, "auction_items", itemId);
        const itemSnap = await getDoc(itemRef);

        if (itemSnap.exists()) {
          setItem({ id: itemSnap.id, ...itemSnap.data() });
        } else {
          setError("Item not found");
        }
      } catch (error) {
        setError("Error fetching item");
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handlePayment = async () => {
    if (!user) {
      alert("You must be logged in to make a payment.");
      return;
    }

    if (item?.highestBidder !== user.uid) {
      alert("You are not the highest bidder for this item.");
      return;
    }

    try {
      const itemRef = doc(db, "auction_items", itemId);
      await updateDoc(itemRef, {
        paymentStatus: "Paid",
      });
      alert("Payment successful!");
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-3xl font-bold mb-4">Payment for {item?.title}</h2>
      <p className="text-lg mb-2">Winning Bid: ₹{item?.highestBid}</p>
      <p className="text-lg mb-4">Auction Winner: {item?.highestBidderName}</p>
      {user?.uid === item?.highestBidder ? (
        <button
          onClick={handlePayment}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-700 transition"
        >
          Make Payment
        </button>
      ) : (
        <p className="text-red-500">You are not the highest bidder.</p>
      )}
    </div>
  );
};

export default Payment;