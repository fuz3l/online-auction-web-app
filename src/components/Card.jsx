import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card({ image, title, movement,caseSize, box,caseMaterial,dial,details, startingBid }) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/details/${encodeURIComponent(title)}/${encodeURIComponent(startingBid)}/${encodeURIComponent(details)}/${encodeURIComponent(image)}`);
    };

    return (
        <div className="auction-card">
            <img src={image} alt={title} className="auction-image" />
            <h3 className="auction-title">{title}</h3>
            <p className="auction-details">{details}</p>
            <p className="auction-bid">Starting Bid: <strong>{startingBid}</strong></p>
            <button className="bid-button">Bid Now</button>
            <button className="view-button" onClick={handleViewDetails}>View Details</button>
        </div>
    );
}
