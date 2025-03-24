import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

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
