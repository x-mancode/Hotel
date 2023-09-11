import { useState } from "react";
import './hotel-image.component.css';
const HotelImage = ({ slides }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const slideStylesWidthBackground = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${slides[currentIndex].url})`,//'url("https://uk2-roomlynx.eu.guestline.net/picturemanager/images/OBMNG1/london-hotels-with-a-view-1614348818.jpeg")', 
  };

  return (
    <div className="imageslider">
      <div>
        <div onClick={goToPrevious} className="leftarrow">
          ❰
        </div>
        <div onClick={goToNext} className="rightarrow">
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground}></div>
    </div>
  );
};

export default HotelImage;
