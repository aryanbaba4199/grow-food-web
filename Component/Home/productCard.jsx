import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Button, Dialog, useMediaQuery, useTheme } from "@mui/material";
import CryptoJS from "crypto-js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useRouter } from "next/router";

const ProductCard = ({ item, isCart, deleteCartItem, qty }) => {
  const router = useRouter();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {item.length == 0 ? (
        <div>
          <h2>No Product Found</h2>
        </div>
      ) : (
        <div className="md:w-60  px-2 flex-1 border bg-gray-100 rounded-md flex flex-col pt-2 justify-center items-center cursor-pointer shadow-sm shadow-black hover:shadow-black hover:shadow-md">
          <div
            onClick={() => {
              const encryptedProduct = CryptoJS.AES.encrypt(
                JSON.stringify(item),
                "2468"
              ).toString();
              router.push(
                `/ProductDetails?thegrowfood=${encodeURIComponent(
                  encryptedProduct
                )}`
              );
            }}
            className="w-full flex-1 justify-center items-center flex flex-col hover:scale-105 hover:ease-in-out hover:transition-all"
          >
            <Carousel
              className="w-full h-auto"
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={3000}
              keyBoardControl={true}
              arrows={false}
              transitionDuration={700}
              dotListClass="custom-dot-list-style"
            >
              {item.image.map((uri, index) => (
                <div className="flex justify-center">
                  <img
                    key={index}
                    src={uri}
                    className="w-28 h-24 rounded-md"
                    alt={item.name}
                  />
                </div>
              ))}
            </Carousel>

            <div>
              <p>{item.name}</p>
              <p className="font-bold">{item.categories}</p>
            </div>

            <div className="flex gap-2 justify-between items-center flex-row w-full px-2 text-gray-600 ">
              <span className="flex gap-1 text-sm">
                <FaRupeeSign className="mt-[5px] text-sm" />
                <span>{item.price}/-</span>
              </span>
              <span>
                <span className="text-green-700">{item.discount}% off</span>
              </span>
              <span className="flex bg-color-1 px-2 gap-1 rounded-md">
                <FaRupeeSign className=" mt-[5px] text-sm" />
                <span>{item.sellingPrice}</span>
              </span>
            </div>

            {isCart && (
              <>
                <div className="flex justify-between pl-4 rounded-sm items-center w-full bg-color-1 mt-2">
                  <span>Quantity : {qty}</span>
                  <Button
                    onClick={() => deleteCartItem(item?._id)}
                    className="p-0 rounded-none px-4 bg-pink-600"
                    variant="contained"
                    style={{
                      backgroundColor: "#db2777",
                      padding: 1,
                      paddingRight: 4,
                      paddingLeft: 4,
                      borderRadius: 0,
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
