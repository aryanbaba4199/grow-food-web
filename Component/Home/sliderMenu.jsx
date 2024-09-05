import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { useRouter } from "next/router";
import { gf_colors } from "@/constants";

const Slide = ({ products, title, timer, filter }) => {
  const router = useRouter();

  const SliderMenu = ({ hours, minutes, seconds }) => {
    return (
      <div className="flex gap-2">
        {hours} : {minutes} : {seconds}
        <p className="font-semibold px-2 rounded-md text-center">Left</p>
      </div>
    );
  };



  return (
    <div className="flex flex-col txt-1">
      <div className={`flex justify-between border border-color-1 rounded-xl rounded-r-none `}>
        <p className="pl-8 font-bold txt-1 py-1">{title}</p>
        <div className="md:flex hidden gap-2 w-[70%] py-1">
          {timer && (
            <>
              <Countdown date={Date.now() + 5.04e7} renderer={SliderMenu} />
            </>
          )}
        </div>
        <div className="flex items-end">
          <button onClick={()=>router.push("/products")} className="bg-color-1 h-full hover:cursor-pointer px-6 text-white font-semibold">
            View All
          </button>
        </div>
      </div>
      
      
        <Carousel
          swipeable={true}
          draggable={true}
          infinite={true}
          keyBoardControl={true}
          centerMode={true}
          responsive={{
            superLargeDesktop: {
              breakpoint: { max: 4000, min: 3000 },
              items: 5,
            },
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 5,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
        >
          {products.map((product, index) => (
            <div
              className="flex border-2 mt-2 ml-2 p-2 rounded-sm  flex-col justify-center items-center hover:cursor-pointer"
              key={index}
              onClick={()=>filter(product.name)}
            >
              <img
                src={
                  product.icon ||
                  "https://cdn.logojoy.com/wp-content/uploads/2018/05/01105857/1553.png"
                }
                alt={product.name || "Grow Food"}
                className="w-28 h-28 shadow-md shadow-black border-1 border-black rounded-full"
              />
              <p className="font-semibold mt-2">
                {product?.name || "Grow Food"}
              </p>
            </div>
          ))}
        </Carousel>
      
    </div>
  );
};

export default Slide;
