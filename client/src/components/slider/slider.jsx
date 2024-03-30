import "./slider.scss";

import { useState } from "react";

export const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);

  const handleChangeSlide = (direction) => {
    if (direction === "left") {
      setImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="full-slider">
          <div onClick={() => handleChangeSlide("left")} className="arrow">
            <img src="/arrow.png" alt="Arrow" />
          </div>
          <div className="img-container">
            <img src={images[imageIndex]} alt="CurrentImage" />
          </div>
          <div onClick={() => handleChangeSlide("right")} className="arrow">
            <img src="/arrow.png" className="right" alt="Arrow" />
          </div>
          <div onClick={() => setImageIndex(null)} className="close">
            X
          </div>
        </div>
      )}
      <div className="big-image">
        <img src={images[0]} alt="BigImage" onClick={() => setImageIndex(0)} />
      </div>
      <div className="small-images">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt="SmallImage"
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
