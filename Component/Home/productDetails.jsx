import React, {useState, useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import UserContext from "@/userContext";

import { Dialog } from "@mui/material";
import Checkout from "../checkout/checkout";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";

const ProductDetails = ({ product, setOpen }) => {
  const [index, setIndex] = useState(0);
  const [checkoutProduct, setCheckoutProduct] = useState("");
  const [cOpen, setCopen] = useState(false);

  const [email, setEmail] = useState("");
  const [qty, setQty] = useState(product.minimumOrderQty);

  
  const {user} = useContext(UserContext)
  const handleCart = () => {
    console.log(product);
  };

  const handleBuyNow = () => {
    if (user.user._id) {
      setCheckoutProduct(product);
      setEmail(user.user.email);
      setCopen(true);
    }
  };

  const handleDecrement = () => {
    if (qty <= product.minimumOrderQty) {
      console.log("This is Minimum");
    } else {
      setQty(qty - 1);
    }
  };

  const handleIncrement = () => {
    if (qty > product.availableQty) {
      console.log("This is maximum quantity");
    } else {
      setQty(qty + 1);
    }
  };

  return (
    <>
      <div className="w-full flex justify-end items-start">
        <IoMdCloseCircle
          className="text-3xl text-red-600 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-8 px-4 gap-8">
        <div className="flex flex-col justify-center w-full md:w-[45%] items-center">
          <img
            src={product.image[index]}
            className="w-full md:w-3/4"
            alt={product.name}
          />
          <div className="flex gap-4 text-xl border border-gray-300 px-4 py-1 justify-between items-center mt-2 shadow-md rounded-2xl">
            <Tooltip title="Decrease Quantity">
              <IconButton onClick={handleDecrement} size="small">
                <FaCircleMinus />
              </IconButton>
            </Tooltip>
            <span>{qty}</span>
            <Tooltip title="Increase Quantity">
              <IconButton onClick={handleIncrement} size="small">
                <FaCirclePlus />
              </IconButton>
            </Tooltip>
          </div>
          <div className="mt-4 w-full flex gap-2 justify-center items-center">
            <Button
              onClick={handleCart}
              variant="contained"
              color="warning"
              className="w-[50%]"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              variant="contained"
              color="success"
              className="w-[50%]"
            >
              Buy Now
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[45%] px-4 md:px-8">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <div className="flex items-center mt-2">
            <span>Rating:</span>
            <div className="flex text-yellow-500 ml-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-green-600">
              <FaRupeeSign className="text-xl" />
              <span className="text-xl font-bold ml-1">
                {product.price - (product.price * product.discount) / 100}
              </span>
              <span className="line-through text-gray-500 ml-4">
                {product.price}
              </span>
              <span className="text-blue-600 font-bold ml-4">
                {product.discount}% off
              </span>
            </div>
            <Table className="mt-4">
              <TableBody>
                <TableRow>
                  <TableCell>Brand:</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category:</TableCell>
                  <TableCell>{product.categories}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sub Category:</TableCell>
                  <TableCell>{product.subCategory}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Packet of:</TableCell>
                  <TableCell>{product.productQty}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Minimum Order:</TableCell>
                  <TableCell>{product.minimumOrderQty}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Food Type:</TableCell>
                  <TableCell>{product.foodPrefence}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Life:</TableCell>
                  <TableCell>{product.life}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-gray-700 mt-4">{product.description}</p>
          </div>
        </div>
      </div>
      <Dialog
        open={cOpen}
        fullWidth
        maxWidth="lg"
        onClose={() => setCopen(false)}
        PaperProps={{ style: { width: "60%", height: "100vh" } }}
      >
        <Checkout
          product={checkoutProduct}
          email={email}
          qty={qty}
          uid={user._id}
          setCopen={setCopen}
        />
      </Dialog>
    </>
  );
};

export default ProductDetails;
