import { useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../services/firebase"; // Firebase configuration (Firestore)
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { ID, Permission, Role } from "appwrite";
import { storage } from "../appwrite"; // Appwrite configuration
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddAuctionItem = () => {
  // Form state for auction item details
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  // Handle file selection from the file input
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload image file to Appwrite Storage and return its public URL
  const uploadImageToAppwrite = async (file) => {
    try {
      const uploadedFile = await storage.createFile(
        "67ac628400330cb1f6c9", // Replace with your actual bucket ID
        ID.unique(),
        file,
        [
          Permission.read(Role.any()),   // Everyone can read
          Permission.write(Role.any()),  // Everyone can write
        ]
      );
      console.log("File uploaded successfully:", uploadedFile);

      // Get the public URL using getFilePreview.
      // Depending on your SDK version, getFilePreview might return a string URL directly.
      const previewResponse = storage.getFilePreview("67ac628400330cb1f6c9", uploadedFile.$id);
      console.log("Preview response:", previewResponse);

      // If previewResponse is a string, return it directly.
      if (typeof previewResponse === "string") {
        return previewResponse;
      } else if (previewResponse && previewResponse.href) {
        return previewResponse.href;
      } else {
        console.error("Failed to obtain public URL from getFilePreview:", previewResponse);
        return null;
      }
    } catch (err) {
      console.error("Error during image upload:", err);
      return null;
    }
  };


  // Handle form submission to add a new auction item
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation for all fields
    if (!user) {
      setError("User not authenticated. Please log in.");
      return;
    }
    if (!file || !title || !description || !startingBid || !endTime) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    setUploading(true);

    try {
      // Upload the image and get its public URL
      const imageUrl = await uploadImageToAppwrite(file);
      if (!imageUrl) {
        setError("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }

      // Save auction item details to Firebase Firestore
      await addDoc(collection(db, "auction_items"), {
        title,
        description,
        startingBid: parseFloat(startingBid),
        endTime: new Date(endTime),
        imageUrl,
        sellerId: user.uid,
        createdAt: serverTimestamp(),
      });

      alert("Auction item added successfully!");
      // Clear the form fields
      setTitle("");
      setDescription("");
      setStartingBid("");
      setEndTime("");
      setFile(null);
    } catch (err) {
      console.error("Error adding auction item:", err);
      setError("Failed to add auction item. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (

    <div className="add-auction-item">
      <Navbar />
      <div className="add-item-div">
        <h2>Add Auction Item</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="title-field">
            <label>Item Title</label>
            <input
              
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div  className="text-area-item">
            <label>Description</label>
            <textarea
           
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="start-bid-field">
            <label>Starting Bid</label>
            <input
            
              type="number"
              placeholder="e.g. 500"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              required
            />
          </div>
          <div   className="auc-end-field">
            <label>Auction End Time</label>
            <input
              type="datetime-local"
            
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div >
            <label>Item Image</label>
            <input
              type="file"
              className="img-input"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <button className="btn-add-item" type="submit" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Auction Item"}
          </button>
        </form>
        </div>

        <Footer />
      </div>
      );
};

      export default AddAuctionItem;
