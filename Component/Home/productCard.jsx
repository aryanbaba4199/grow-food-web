import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import ProductDetails from "./productDetails";
import { MdDelete } from "react-icons/md";

const ProductCard = ({ item, isCart, deleteCartItem }) => {
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {item.length==0 ?<div>
          <h2>No Product Found</h2>

      </div> : 
      <div
        className="px-2 border rounded-md flex flex-col py-2 justify-center items-center cursor-pointer shadow-sm shadow-black hover:shadow-black hover:shadow-md"
      >
        <img src={item.image[0]} className="w-24" alt={item.name} onClick={() => setOpen(true)} />
        <div onClick={() => setOpen(true)}>
          <p>{item.name}</p>
          <p className="font-bold">{item.categories}</p>
        </div>

        <div className="flex gap-2">
          <>
            <FaRupeeSign className="mt-1" />
            <p>{item.price}/-</p>
          </>
          <>
            {isCart && (
              <button onClick={() => deleteCartItem(item._id)}>
                <MdDelete className="text-red-600 text-end" />
              </button>
            )}
          </>
        </div>
      </div>
}
      <Dialog
        fullWidth
        maxWidth="lg"
        fullScreen={isSmallScreen} // Enable full screen mode on small screens
        PaperProps={{ style: { width: isSmallScreen ? "100%" : "80%", height: "100vh" } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ProductDetails setOpen={setOpen} product={item} />
      </Dialog>
    </>
  );
};

export default ProductCard;
