import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";

/*
  react에서의 Swiper 문법은 다르기 때문에, 테스트 해보기 위해 만든 컴포넌트다.
*/

// swiper를 스타일 컴포넌트를 사용해서 style 주는 법

const StyleSlide = styled(SwiperSlide)`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
`;
const DescContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  color: white;
  transform: translate(-50%, -50%);
  h3{
    text-align: center;
    font-size: 48px;
    @media screen and (max-width: 768px){
      font-size: 36px;
    }
    @media screen and (max-width: 1280px){
      font-size: 30px;
    }
  }
  p{
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    @media screen and (max-width: 768px){
      font-size: 14px;
    }
    @media screen and (max-width: 1280px){
      font-size: 20px;
    }
  }
`;

function Banner() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        navigation={{ clickable: true }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {
          // e를 안쓰면 언더바를 써준다!
          Array(5)
            .fill()
            .map((_, i) => {
              return (
                <StyleSlide key={i}>
                  <img src={`./Images/1920x1080(${i + 1}).jpg`} alt="slide" />
                  <DescContent>
                    <h3>강조하는 제목 {i+1}</h3>
                  </DescContent>
                </StyleSlide>
              );
            })
        }
      </Swiper>
    </>
  );
}

export default Banner;
