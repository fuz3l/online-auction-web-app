import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

// Reference to Firestore collection
const auctionCollection = collection(db, "auctions");

// Add a new auction item
export const addAuctionItem = async (item) => {
    try {
        await addDoc(auctionCollection, item);
        console.log("Auction item added successfully");
    } catch (error) {
        console.error("Error adding item:", error);
    }
};

// Get all auction items
export const getAuctionItems = async () => {
    try {
        const querySnapshot = await getDocs(auctionCollection);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching items:", error);
        return [];
    }
};

// Update bid amount
export const updateBid = async (itemId, newBid) => {
    try {
        const itemRef = doc(db, "auctions", itemId);
        await updateDoc(itemRef, { highestBid: newBid });
        console.log("Bid updated successfully");
    } catch (error) {
        console.error("Error updating bid:", error);
    }
};
