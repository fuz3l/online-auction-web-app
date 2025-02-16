import { useState } from "react";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="image-slider">
      <button onClick={prevSlide}>‹</button>
      <img src={images[current]} alt="Auction Item" />
      <button onClick={nextSlide}>›</button>
    </div>
  );
};

export default ImageSlider;
