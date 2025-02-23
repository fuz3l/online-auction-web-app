import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

const AuctionEnd = ({ auctionId }) => {
  const [auction, setAuction] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkAuctionStatus = async () => {
      if (!auctionId) return;

      const auctionRef = doc(db, "auctions", auctionId);
      const auctionSnap = await getDoc(auctionRef);

      if (auctionSnap.exists()) {
        const auctionData = auctionSnap.data();
        setAuction(auctionData);

        // Check if auction is ended
        const currentTime = new Date();
        if (auctionData.endTime.toDate() < currentTime && !auctionData.winnerId) {
          findWinner(auctionData);
        }
      }
    };

    checkAuctionStatus();
  }, [auctionId]);

  const findWinner = async (auctionData) => {
    if (!auctionData.bids || auctionData.bids.length === 0) return;

    // Get the highest bid
    const highestBid = auctionData.bids.reduce((max, bid) => (bid.amount > max.amount ? bid : max), auctionData.bids[0]);

    // Store winner details
    const winnerId = highestBid.userId;
    const winnerName = highestBid.userName;
    const finalBid = highestBid.amount;

    setWinner({ winnerName, finalBid });

    // Update Auction with Winner Details
    await updateDoc(doc(db, "auctions", auctionId), {
      winnerId,
      winnerName,
      finalPrice: finalBid,
      status: "ended"
    });

    // Send Notification
    await addDoc(collection(db, "notifications"), {
      userId: winnerId,
      message: `🎉 Congrats ${winnerName}! You won the auction for ₹${finalBid}.`,
      timestamp: serverTimestamp(),
      auctionId: auctionId
    });
  };

  return (
    <div>
      {auction && auction.status === "ended" ? (
        <p className="text-green-600">🎉 {winner?.winnerName} won this auction for ₹{winner?.finalBid}!</p>
      ) : (
        <p className="text-gray-500">Auction is ongoing...</p>
      )}
    </div>
  );
};

export default AuctionEnd;
