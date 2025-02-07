import React from 'react'
import Card from './Card.jsx'
import ImageSlider from './ImageSlider.jsx'
function Home() {
  return (
<>
      <div className="home-container">
        <ImageSlider />
        <div className="customer-static">
          <h3 className="">24/7
          live auctions</h3>
          <h3 className="">40+
          registered members</h3>
        </div>
        <div className="main-item-con">
          <div className="card-container">
            <Card
              image={'https://www.therevolverclub.com/cdn/shop/files/WhatsAppImage2025-01-24at4.43.42PM.jpg?v=1737717440&width=1000'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a  gorge '}
            />

            <Card
              image={'/Angelus-Chronodate-43.jpg'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a part '}
            />
            <Card
              image={'/Angelus-Chronodate-43.jpg'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a part '}
            />
            <Card
              image={'/Angelus-Chronodate-43.jpg'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a parti '}
            />

          </div>
          <div className="customer-static">
          <h3 className="">Top Items</h3>
          
        </div>
          <div className="card-container">
            <Card
              image={'https://www.therevolverclub.com/cdn/shop/files/WhatsAppImage2025-01-24at4.43.42PM.jpg?v=1737717440&width=1000'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a  gorge '}
            />

            <Card
              image={'/public/Angelus-Chronodate-43.jpg'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a part '}
            />
            <Card
              image={'/public/Angelus-Chronodate-43.jpg'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a part '}
            />
            <Card
              image={'/public/Angelus-Chronodate-43.jpg'}
              title={'HMT Vijay (040904)'}
              startingBid={'₹7850'}
              details={'This is a vintage HMT Vijay watch with a parti '}
            />

          </div>

       </div>
        </div>

      </>
      )
}

      export default Home