

// import { useState } from "react";
// import { getAuth } from "firebase/auth";
// import { db } from "../services/firebase"; // Firebase configuration (Firestore)
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// import { ID, Permission, Role } from "appwrite";
// import { storage } from "../appwrite"; // Appwrite configuration
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const AddAuctionItem = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState([]); // Store points as an array
//   const [currentPoint, setCurrentPoint] = useState(""); // Temporary input for a single point
//   const [startingBid, setStartingBid] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [error, setError] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // Add a point to the description list
//   const addPoint = () => {
//     if (currentPoint.trim() !== "") {
//       setDescription([...description, currentPoint]);
//       setCurrentPoint("");
//     }
//   };

//   // Remove a point from the description list
//   const removePoint = (index) => {
//     setDescription(description.filter((_, i) => i !== index));
//   };

//   const uploadImageToAppwrite = async (file) => {
//     try {
//       const uploadedFile = await storage.createFile(
//         "67ac628400330cb1f6c9",
//         ID.unique(),
//         file,
//         [
//           Permission.read(Role.any()),
//           Permission.write(Role.any()),
//         ]
//       );

//       const previewResponse = storage.getFilePreview("67ac628400330cb1f6c9", uploadedFile.$id);
//       return typeof previewResponse === "string" ? previewResponse : previewResponse.href;
//     } catch (err) {
//       console.error("Error during image upload:", err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!user) {
//       setError("User not authenticated. Please log in.");
//       return;
//     }
//     if (!file || !title || description.length === 0 || !startingBid || !endTime) {
//       setError("Please fill in all fields and select an image.");
//       return;
//     }

//     setUploading(true);

//     try {
//       const imageUrl = await uploadImageToAppwrite(file);
//       if (!imageUrl) {
//         setError("Image upload failed. Please try again.");
//         setUploading(false);
//         return;
//       }

//       await addDoc(collection(db, "auction_items"), {
//         title,
//         description, // Save description as an array
//         startingBid: parseFloat(startingBid),
//         endTime: new Date(endTime),
//         imageUrl,
//         sellerId: user.uid,
//         createdAt: serverTimestamp(),
//       });

//       alert("Auction item added successfully!");
//       setTitle("");
//       setDescription([]);
//       setStartingBid("");
//       setEndTime("");
//       setFile(null);
//     } catch (err) {
//       console.error("Error adding auction item:", err);
//       setError("Failed to add auction item. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="add-auction-item mt-24 h-screen">
      
//       <div className="add-item-div">
//         <h2 className="font-bold">Add Auction Item</h2>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="title-field">
//             <label>Item Title</label>
//             <input type="text" className="border border-red-300" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           </div>

//           <div className="text-area-item">
//             <label>Description (Point-wise)</label>
//             <div className="flex">
//             <input
//                 type="text"
//                 className="border border-red-300"
//                 placeholder="Enter a point"
//                 value={currentPoint}
//                 onChange={(e) => setCurrentPoint(e.target.value)}
//               />
//               <button type="button" onClick={addPoint} className=" ml-1 rounded-s-sm add-point-btn border border-red-300">➕ Add</button>
//             </div>
//             <ul className="point-list">
//               {description.map((point, index) => (
//                 <li key={index} className="point-item">
//                   {point} 
//                   <button type="button" onClick={() => removePoint(index)} className="remove-btn">❌</button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="start-bid-field ">
//             <label>Starting Bid</label>
//             <input className="border border-red-300" type="number" placeholder="e.g. 500" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
//           </div>

//           <div className="auc-end-field  border-red-300">
//             <label>Auction End Time</label>
//             <input className="border border-red-300" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
//           </div>

//           <div>
//             <label>Item Image</label>
//             <input type="file" className="img-input border border-red-300" accept="image/*" onChange={handleFileChange} required />
//           </div>

//           <button className="btn-add-item bg-red-600 hover:bg-red-400" type="submit" disabled={uploading}>
//             {uploading ? "Uploading..." : "Add Auction Item"}
//           </button>
//         </form>
//       </div>
    
//     </div>
//     <Footer />
//     </>
//   );
// };

// export default AddAuctionItem;


// import { useState } from "react";
// import { getAuth } from "firebase/auth";
// import { db } from "../services/firebase"; // Firebase configuration
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { ID, Permission, Role } from "appwrite";
// import { storage } from "../appwrite"; // Appwrite configuration
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const AddAuctionItem = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState([]); // Store description points
//   const [currentPoint, setCurrentPoint] = useState(""); // Temporary input for a single point
//   const [startingBid, setStartingBid] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [error, setError] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // Add a point to the description list
//   const addPoint = () => {
//     if (currentPoint.trim() !== "") {
//       setDescription([...description, currentPoint]);
//       setCurrentPoint("");
//     }
//   };

//   // Remove a point from the description list
//   const removePoint = (index) => {
//     setDescription(description.filter((_, i) => i !== index));
//   };

//   const uploadImageToAppwrite = async (file) => {
//     try {
//       const uploadedFile = await storage.createFile(
//         "67ac628400330cb1f6c9",
//         ID.unique(),
//         file,
//         [Permission.read(Role.any()), Permission.write(Role.any())]
//       );

//       return storage.getFilePreview("67ac628400330cb1f6c9", uploadedFile.$id);
//     } catch (err) {
//       console.error("Error during image upload:", err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!user) {
//       setError("User not authenticated. Please log in.");
//       return;
//     }
//     if (!file || !title || description.length === 0 || !startingBid || !endTime) {
//       setError("Please fill in all fields and select an image.");
//       return;
//     }

//     setUploading(true);

//     try {
//       const imageUrl = await uploadImageToAppwrite(file);
//       if (!imageUrl) {
//         setError("Image upload failed. Please try again.");
//         setUploading(false);
//         return;
//       }

//       await addDoc(collection(db, "auction_items"), {
//         title,
//         description,
//         startingBid: parseFloat(startingBid),
//         endTime: new Date(endTime),
//         imageUrl,
//         sellerId: user.uid,
//         sellerName: user.displayName || "Anonymous", // Store seller's name
//         createdAt: serverTimestamp(),
//       });

//       alert("Auction item added successfully!");
//       setTitle("");
//       setDescription([]);
//       setStartingBid("");
//       setEndTime("");
//       setFile(null);
//       document.querySelector(".img-input").value = ""; // Reset file input
//     } catch (err) {
//       console.error("Error adding auction item:", err);
//       setError("Failed to add auction item. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="add-auction-item mt-24 h-screen">
//         <div className="add-item-div">
//           <h2 className="font-bold">Add Auction Item</h2>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="title-field">
//               <label>Item Title</label>
//               <input type="text" className="border border-red-300" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             </div>

//             <div className="text-area-item">
//               <label>Description (Point-wise)</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   className="border border-red-300"
//                   placeholder="Enter a point"
//                   value={currentPoint}
//                   onChange={(e) => setCurrentPoint(e.target.value)}
//                 />
//                 <button type="button" onClick={addPoint} className="ml-1 rounded-s-sm add-point-btn border border-red-300">➕ Add</button>
//               </div>
//               <ul className="point-list">
//                 {description.map((point, index) => (
//                   <li key={index} className="point-item">
//                     {point} 
//                     <button type="button" onClick={() => removePoint(index)} className="remove-btn">❌</button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="start-bid-field">
//               <label>Starting Bid</label>
//               <input className="border border-red-300" type="number" placeholder="e.g. 500" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
//             </div>

//             <div className="auc-end-field border-red-300">
//               <label>Auction End Time</label>
//               <input className="border border-red-300" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
//             </div>

//             <div>
//               <label>Item Image</label>
//               <input type="file" className="img-input border border-red-300" accept="image/*" onChange={handleFileChange} required />
//             </div>

//             <button className="btn-add-item bg-red-600 hover:bg-red-400" type="submit" disabled={uploading}>
//               {uploading ? "Uploading..." : "Add Auction Item"}
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AddAuctionItem;


// import { useState, useEffect } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { db } from "../services/firebase"; // Firebase configuration
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { ID, Permission, Role } from "appwrite";
// import { storage } from "../appwrite"; // Appwrite configuration
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const AddAuctionItem = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState([]);
//   const [currentPoint, setCurrentPoint] = useState("");
//   const [startingBid, setStartingBid] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [error, setError] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [sellerName, setSellerName] = useState("Anonymous");

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         setSellerName(currentUser.displayName || "Anonymous");
//       } else {
//         setUser(null);
//         setSellerName("Anonymous");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleFileChange = (event) => setFile(event.target.files[0]);

//   const addPoint = () => {
//     if (currentPoint.trim() !== "") {
//       setDescription([...description, currentPoint]);
//       setCurrentPoint("");
//     }
//   };

//   const removePoint = (index) => {
//     setDescription(description.filter((_, i) => i !== index));
//   };

//   const uploadImageToAppwrite = async (file) => {
//     try {
//       const uploadedFile = await storage.createFile(
//         "67ac628400330cb1f6c9",
//         ID.unique(),
//         file,
//         [Permission.read(Role.any()), Permission.write(Role.any())]
//       );
//       return storage.getFilePreview("67ac628400330cb1f6c9", uploadedFile.$id);
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (!user) {
//       setError("User not authenticated. Please log in.");
//       return;
//     }
//     if (!file || !title || description.length === 0 || !startingBid || !endTime) {
//       setError("Please fill in all fields and select an image.");
//       return;
//     }

//     setUploading(true);

//     try {
//       const imageUrl = await uploadImageToAppwrite(file);
//       if (!imageUrl) {
//         setError("Image upload failed. Please try again.");
//         setUploading(false);
//         return;
//       }

//       await addDoc(collection(db, "auction_items"), {
//         title,
//         description,
//         startingBid: parseFloat(startingBid),
//         endTime: new Date(endTime),
//         imageUrl,
//         sellerId: user.uid,
//         sellerName: sellerName, // Store seller's name
//         createdAt: serverTimestamp(),
//       });

//       alert("Auction item added successfully!");
//       setTitle("");
//       setDescription([]);
//       setStartingBid("");
//       setEndTime("");
//       setFile(null);
//       document.querySelector(".img-input").value = ""; // Reset file input
//     } catch (err) {
//       console.error("Error adding auction item:", err);
//       setError("Failed to add auction item. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="add-auction-item mt-24 h-screen">
//         <div className="add-item-div">
//           <h2 className="font-bold">Add Auction Item</h2>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="title-field">
//               <label>Item Title</label>
//               <input type="text" className="border border-red-300" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             </div>

//             <div className="text-area-item">
//               <label>Description (Point-wise)</label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   className="border border-red-300"
//                   placeholder="Enter a point"
//                   value={currentPoint}
//                   onChange={(e) => setCurrentPoint(e.target.value)}
//                 />
//                 <button type="button" onClick={addPoint} className="ml-1 rounded-s-sm add-point-btn border border-red-300">➕ Add</button>
//               </div>
//               <ul className="point-list">
//                 {description.map((point, index) => (
//                   <li key={index} className="point-item">
//                     {point} 
//                     <button type="button" onClick={() => removePoint(index)} className="remove-btn">❌</button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="start-bid-field">
//               <label>Starting Bid</label>
//               <input className="border border-red-300" type="number" placeholder="e.g. 500" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
//             </div>

//             <div className="auc-end-field border-red-300">
//               <label>Auction End Time</label>
//               <input className="border border-red-300" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
//             </div>

//             <div>
//               <label>Item Image</label>
//               <input type="file" className="img-input border border-red-300" accept="image/*" onChange={handleFileChange} required />
//             </div>

//             <button className="btn-add-item bg-red-600 hover:bg-red-400" type="submit" disabled={uploading}>
//               {uploading ? "Uploading..." : "Add Auction Item"}
//             </button>
//           </form>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default AddAuctionItem;


import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../services/firebase"; // Firebase configuration
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { ID, Permission, Role } from "appwrite";
import { storage } from "../appwrite"; // Appwrite configuration
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AddAuctionItem = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState([]);
  const [currentPoint, setCurrentPoint] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [sellerName, setSellerName] = useState("Anonymous");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setSellerName(userDocSnap.data().fullName || "Anonymous");
        }
      } else {
        setUser(null);
        setSellerName("Anonymous");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const addPoint = () => {
    if (currentPoint.trim() !== "") {
      setDescription([...description, currentPoint]);
      setCurrentPoint("");
    }
  };

  const removePoint = (index) => {
    setDescription(description.filter((_, i) => i !== index));
  };

  const uploadImageToAppwrite = async (file) => {
    try {
      const uploadedFile = await storage.createFile(
        "67ac628400330cb1f6c9",
        ID.unique(),
        file,
        [Permission.read(Role.any()), Permission.write(Role.any())]
      );
      return storage.getFilePreview("67ac628400330cb1f6c9", uploadedFile.$id);
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("User not authenticated. Please log in.");
      return;
    }
    if (!file || !title || description.length === 0 || !startingBid || !endTime) {
      setError("Please fill in all fields and select an image.");
      return;
    }

    setUploading(true);

    try {
      const imageUrl = await uploadImageToAppwrite(file);
      if (!imageUrl) {
        setError("Image upload failed. Please try again.");
        setUploading(false);
        return;
      }

      await addDoc(collection(db, "auction_items"), {
        title,
        description,
        startingBid: parseFloat(startingBid),
        endTime: new Date(endTime),
        imageUrl,
        sellerId: user.uid,
        sellerName, // Updated to fetch from Firestore
        createdAt: serverTimestamp(),
      });

      alert("Auction item added successfully!");
      setTitle("");
      setDescription([]);
      setStartingBid("");
      setEndTime("");
      setFile(null);
      document.querySelector(".img-input").value = ""; // Reset file input
    } catch (err) {
      console.error("Error adding auction item:", err);
      setError("Failed to add auction item. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-auction-item mt-24 h-screen">
        <div className="add-item-div">
          <h2 className="font-bold">Add Auction Item</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="title-field">
              <label>Item Title</label>
              <input type="text" className="border border-red-300" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="text-area-item">
              <label>Description (Point-wise)</label>
              <div className="flex">
                <input type="text" className="border border-red-300" placeholder="Enter a point" value={currentPoint} onChange={(e) => setCurrentPoint(e.target.value)} />
                <button type="button" onClick={addPoint} className="ml-1 rounded-s-sm add-point-btn border border-red-300">➕ Add</button>
              </div>
              <ul className="point-list">
                {description.map((point, index) => (
                  <li key={index} className="point-item">{point} <button type="button" onClick={() => removePoint(index)} className="remove-btn">❌</button></li>
                ))}
              </ul>
            </div>

            <div className="start-bid-field">
              <label>Starting Bid</label>
              <input className="border border-red-300" type="number" placeholder="e.g. 500" value={startingBid} onChange={(e) => setStartingBid(e.target.value)} required />
            </div>

            <div className="auc-end-field border-red-300">
              <label>Auction End Time</label>
              <input className="border border-red-300" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>

            <div>
              <label>Item Image</label>
              <input type="file" className="img-input border border-red-300" accept="image/*" onChange={handleFileChange} required />
            </div>

            <button className="btn-add-item bg-red-600 hover:bg-red-400" type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Add Auction Item"}</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAuctionItem;
