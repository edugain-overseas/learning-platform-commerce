import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { remToPx } from "../../../utils/remToPx";
import "swiper/css";

const HomeSlider = ({ items, renderItem, swiperProps = {}, children }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={remToPx(16)}
      {...swiperProps}
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        gap: "16rem",
      }}
    >
      {children}
      {items.map((item, index) => (
        <SwiperSlide style={{ width: "auto" }} key={index}>
          {renderItem(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeSlider;
