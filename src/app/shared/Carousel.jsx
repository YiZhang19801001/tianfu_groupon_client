import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Notice from "./Notice";

const MyCarousel = () => {
  return (
    <Carousel showThumbs={false}>
      {/* <div>
        <Notice />
      </div> */}
      <div>
        <img src="images/slide_1.png" alt="pic_1" />
      </div>
      <div>
        <img src="images/slide_2.png" alt="pic_2" />
      </div>
      <div>
        <img src="images/slide_3.png" alt="pic_3" />
      </div>
      <div>
        <img src="images/slide_4.png" alt="pic_4" />
      </div>
    </Carousel>
  );
};

export default MyCarousel;
