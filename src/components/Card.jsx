// import { Link } from "react-router-dom";

// const Card = ({ item }) => {
//   return (
//     <div className="card">
//       <img src={item.image} alt={item.title} />
//       <h3>{item.title}</h3>
//       <p>Starting Bid: ₹{item.startingBid}</p>
//      <Link to={`/details/${item.id}`} className="btn">View Details</Link>  
//     </div>
//   );
// };

// export default Card;

import { Link } from "react-router-dom";
 import { collection, getDocs } from "firebase/firestore";
 import { db } from "../services/firebase";

const Card = ({ item }) => {
  return (
    <div className="card">
      <div className="card-image-container">
        <img src={item.image} alt={item.title} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-bid">Starting Bid: ₹{item.startingBid}</p>
      </div>
      <Link to={`/details/${item.id}`} className="card-btn">
        View Details
      </Link>
    </div>
  );
};

export default Card;
