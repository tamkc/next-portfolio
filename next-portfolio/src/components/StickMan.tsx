import React, { useState, useEffect } from "react";

const StickMan = () => {
  // Array of image sources
  const images = ["/walk-left-1.png", "/walk-left-2.png", "/walk-left-3.png"];

  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to cycle through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      {/* Display the current image */}
      <img
        src={images[currentImageIndex]}
        alt="Walking Stick Man"
        className="w-32 h-32" // Adjust size as needed
      />
    </div>
  );
};

export default StickMan;
