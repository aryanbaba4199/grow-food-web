import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Button, Dialog, useMediaQuery, useTheme } from "@mui/material";
import ProductDetails from "./productDetails";
import { MdDelete } from "react-icons/md";

const ProductCard = ({ item, isCart, deleteCartItem, qty }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {item.length == 0 ? (
        <div>
          <h2>No Product Found</h2>
        </div>
      ) : (
        <div className="md:w-60  px-2 flex-1 border bg-gray-100 rounded-md flex flex-col pt-2 justify-center items-center cursor-pointer shadow-sm shadow-black hover:shadow-black hover:shadow-md">
          <div
            onClick={() => setOpen(true)}
            className="w-full flex-1 justify-center items-center flex flex-col"
          >
            <img
              src={item.image[0]}
              className="w-28 h-24 rounded-md"
              alt={item.name}
            />
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
      <Dialog
        fullWidth
        maxWidth="lg"
        fullScreen={isSmallScreen} // Enable full screen mode on small screens
        PaperProps={{
          style: { width: isSmallScreen ? "100%" : "80%", height: "100vh" },
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ProductDetails setOpen={setOpen} product={item} cartQty={qty} />
      </Dialog>
    </>
  );
};

export default ProductCard;
