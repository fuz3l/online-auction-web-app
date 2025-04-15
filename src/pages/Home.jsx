
import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tilt from "react-parallax-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Particles from "react-tsparticles";
import HelpChatbot from "../components/HelpChatbot";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [items, setItems] = useState([]);
  const [imageLoaded, setImageLoaded] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-button",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.5, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRefs.current,
          start: "top 90%",
        },
      }
    );
  }, [items]);

  useEffect(() => {
    const fetchAuctionItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "auction_items"));
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      } catch (err) {
        console.error("Error fetching auction items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAuctionItems();
  }, []);

  const handleItemClick = (id) => {
    if (!id) {
      console.error("Error: Item ID is missing.");
      return;
    }
    navigate(`/details/${id}`);
  };

  return (
    <>
      <Navbar />
      <Particles 
        options={{ particles: { number: { value: 100 }, move: { speed: 1 }, color: { value: "#ffffff" } } }} 
        className="absolute inset-0 z-0" 
      />

      {/* Hero Section */}
      <div className="relative w-full h-screen bg-gradient-to-br from-black to-red-900 flex flex-col items-center justify-center text-white text-center px-6 shadow-xl overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide drop-shadow-lg hero-title">
          WELCOME TO THE MARXBID AUCTION HOUSE.
        </h1>
        <p className="mt-3 text-lg md:text-xl opacity-80 hero-title">
          BID HERE AND COLLECT VINTAGE AND COOL MEMORIES OF ITEMS.
        </p>
  
<HelpChatbot />
        <button
          className="mt-6 bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 hero-button"
          onClick={() => document.getElementById("featured-section").scrollIntoView({ behavior: "smooth" })}
        >
          Explore Auctions
        </button>
      </div>

      {/* Featured Auctions Section */}
      <div id="featured-section" className="mt-10 px-6 py-12 bg-gray-900 text-white shadow-lg rounded-lg">
        <h2 className="text-center text-3xl font-semibold mb-8">Featured Auctions</h2>
        {loading ? (
          <p className="text-center animate-pulse">Loading auction items...</p>
        ) : items.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
              <Tilt key={item.id} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.3} glareColor="#ffffff">
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="border border-gray-700 rounded-lg p-5 shadow-lg bg-gray-800 transition-transform transform hover:scale-105 hover:border-blue-500 hover:ring-2 ring-blue-300 h-[420px] flex flex-col justify-between opacity-0"
                >
                  <div className="w-full h-48 overflow-hidden rounded-md relative">
                    {!imageLoaded[item.id] && <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div>}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      onLoad={() => setImageLoaded((prev) => ({ ...prev, [item.id]: true }))}
                      className={`w-full h-full object-cover rounded-md transition-opacity duration-500 ${imageLoaded[item.id] ? "opacity-100" : "opacity-0"}`}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-400 text-sm">Starting Bid: ₹{item.startingBid}</p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition-all"
                    onClick={() => handleItemClick(item.id)}
                  >
                    View Details
                  </button>
                </div>
              </Tilt>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No auction items found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;