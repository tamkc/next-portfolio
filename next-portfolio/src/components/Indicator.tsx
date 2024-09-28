import { useEffect, useState } from "react";
import { MousePointerClick } from "lucide-react";

interface IndicatorProp {
  className: string;
}

const Indicator = () => {
  const [showPointer, setShowPointer] = useState(false); // Initially hide the pointer

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowPointer(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowPointer(false);
    }, 8000);

    return () => {
      clearTimeout(showTimer); // Clean up the show timer
      clearTimeout(hideTimer); // Clean up the hide timer
    };
  }, []);

  return (
    <div className="absolute ml-6">
      {showPointer && (
        <div className="absolute -top-4 ml-5 flex items-center space-x-2 z-50 md:flex-row flex-col">
          <div className="pointer-hand bg-black text-white text-sm rounded-full p-1">
            <MousePointerClick />
          </div>
          <div className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm shadow-lg mt-2 md:mt-0 animate-bounce">
            Resume Here
          </div>
        </div>
      )}
    </div>
  );
};

export default Indicator;
