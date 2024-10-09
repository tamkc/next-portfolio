import React from "react";

const LoadingVideo: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 overflow-hidden">
      <video
        playsInline
        src="/videos/loading.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src="/videos/loading.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingVideo;
