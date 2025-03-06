// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../services/firebase";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from '../components/Footer'
// const Home = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAuctionItems = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "auction_items"));
//         const itemsList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setItems(itemsList);
//       } catch (error) {
//         console.error("Error fetching auction items:", error);
//       }
//     };

//     fetchAuctionItems();
//   }, []);

//   const handleItemClick = (id) => {
//     navigate(`/details/${id}`);
//   };

//   return (
//     <>
    
//       <Navbar />
//       <div className="home mt-24">
      
//       <h2 className="m-3 text-center font-bold text-2xl">Welcome to AuctionApp</h2>
//       <div className="items-grid" style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", padding: "20px" }}>
//         {items.length > 0 ? (
//           items.map((item) => (
//             <div
//   key={item.id}
//   className="auction-item"
//   style={{
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     padding: "10px",
//     cursor: "pointer",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   }}
//   onClick={() => handleItemClick(item.id)}
// >
//   {/* Fixed-height image container */}
//   <div
//     style={{
//       width: "100%",
//       height: "150px",
//       overflow: "hidden",
//       borderRadius: "4px",
//       marginBottom: "8px",
//     }}
//   >
//     <img
//       src={item.imageUrl}
//       alt={item.title}
//       loading="lazy"
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover",
//       }}
//     />
//   </div>
//   <h3 style={{ margin: "0 0 8px 0" }}>{item.title}</h3>
//   <p style={{ margin: "0 0 8px 0" }}>Starting Bid: ₹{item.startingBid}</p>
//   <button
//     className="bg-red-600 text-white px-3 w-full rounded-full py-2"
//     style={{
//       alignSelf: "center", // Centers the button horizontally
//       marginTop: "auto", // Pushes the button to the bottom if space allows
//     }}
//   >
//     View Details
//   </button>
// </div>


//           ))
//         ) : (
//           <p>No auction items found.</p>
//         )}
//       </div>
//       <Footer />
//       </div>
//     </>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [items, setItems] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({}); // Track which images are loaded
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
    <>
      <Navbar />
      <div className="home mt-24">
        <h2 className="m-3 text-center font-bold text-2xl">Welcome to AuctionApp</h2>
        <div
          className="items-grid"
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            padding: "20px",
          }}
        >
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="auction-item"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onClick={() => handleItemClick(item.id)}
              >
                {/* Image Wrapper for Fixed Height */}
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    overflow: "hidden",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    position: "relative",
                  }}
                >
                  {/* Show Skeleton Loader Until Image Loads */}
                  {!imageLoaded[item.id] && (
                    <div
                      className="skeleton-loader"
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
                        backgroundSize: "200% 100%",
                        animation: "skeleton-loading 1.5s infinite",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        borderRadius: "4px",
                      }}
                    ></div>
                  )}

                  {/* Actual Image with Lazy Loading */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    onLoad={() => setImageLoaded((prev) => ({ ...prev, [item.id]: true }))}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: imageLoaded[item.id] ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out",
                    }}
                  />
                </div>

                <h3 style={{ margin: "0 0 8px 0" }}>{item.title}</h3>
                <p style={{ margin: "0 0 8px 0" }}>Starting Bid: ₹{item.startingBid}</p>
                <button
                  className="bg-red-600 text-white px-3 w-full rounded-full py-2"
                  style={{
                    alignSelf: "center",
                    marginTop: "auto",
                  }}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No auction items found.</p>
          )}
        </div>
        <Footer />
      </div>

      {/* Skeleton Loading Animation CSS */}
      <style>
        {`
          @keyframes skeleton-loading {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </>
  );
};

export default Home;
