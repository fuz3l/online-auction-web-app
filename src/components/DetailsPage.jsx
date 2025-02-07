import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function DetailsPage() {
    const { title, startingBid, details, image,movement,caseSize, box,caseMaterial,dial } = useParams();
    
    // Initialize timer state with 4 hours (14400 seconds)
    const [timeLeft, setTimeLeft] = useState(4 * 60 * 60);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [timeLeft]);

    // Convert seconds into HH:MM:SS format
    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <>
            <div className="info-bar mnp">
                <h3>Time Left: <span className="timer">{formatTime(timeLeft)}</span></h3>
            </div>

            <div className="details-container">
                <h2>{decodeURIComponent(title)}</h2>
                <img src={decodeURIComponent(image)} alt={decodeURIComponent(title)} className="details-image" />
                <p>{decodeURIComponent(details)}</p>

                <p className='bid-p'>Starting Bid: <strong>{decodeURIComponent(startingBid)}</strong></p>
                <button className="bid-button">Place Bid</button>
            </div>
        </>
    );
}

export default DetailsPage;
