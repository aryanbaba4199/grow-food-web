import React, { useState, useContext, useEffect } from "react";
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

import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import Checkout from "../checkout/checkout";
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import axios from "axios";
import { createCartbyUser } from "@/Api";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ProductDetails = ({ product, setOpen, cartQty }) => {
  const [index, setIndex] = useState(0);
  const [checkoutProduct, setCheckoutProduct] = useState("");
  const [cOpen, setCopen] = useState(false);

  const [email, setEmail] = useState("");
  const [qty, setQty] = useState(product.minimumOrderQty);

  const router = useRouter();
  const { token, user } = useContext(UserContext);

  const handleCart = async () => {
    if (token !== "") {
      const data = {
        userId: user?.user?._id,
        productId: product?._id,
        qty: qty,
      };
      try {
        const res = await axios.post(`${createCartbyUser}`, { data });
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Added to Cart Successfully...",
            showClass: {
              popup: "true",
            },
          });
        }
      } catch (e) {
        console.error(e);
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: e.message,
          position: "top-end",
        });
      }
    } else {
      Swal.fire({
        title: "Log in Required",
        icon: "warning",
        text: "Log in required for handling cart details",
        confirmButtonText: "Log in ",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth");
        }
      });
    }
  };
  useEffect(() => {
    if (cartQty) {
      setQty(cartQty);
    }
  }, [cartQty]);

  const handleBuyNow = () => {
    if (token !== "") {
      setCheckoutProduct(product);
      setEmail(user?.user?.email);
      setCopen(true);
    } else {
      Swal.fire({
        title: "Log in Required",
        icon: "warning",
        text: "Log in required to provide you the best services...",
        confirmButtonText: "Log in ",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth");
        }
      });
    }
  };

  const handleDecrement = () => {
    if (qty <= product.minimumOrderQty) {
      console.log("This is Minimum");
    } else {
      setQty(qty - 1);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  console.log(isSmallScreen);

  const handleIncrement = () => {
    if (qty > product.availableQty) {
      console.log("This is maximum quantity");
    } else {
      setQty(qty + 1);
    }
  };
  console.log(product.image);
  return (
    <>
      <div className="w-full flex justify-end items-start md:mt-0 mt-16">
        <IoMdCloseCircle
          className="text-3xl absolute text-red-600 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-8 px-4 gap-8 md:mb-0 mb-8">
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
          <div className="mt-4 w-full flex gap-2 justify-center md:relative fixed bottom-0 items-center">
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
          <div className="mt-4 mb-16">
            <div className="flex items-center">
              <span className="line-through text-gray-500 ml-4">
                {product.price}
              </span>
              <span className="text-green-700 font-bold ml-4">
                {product.discount}% off
              </span>
              <div className="flex ml-4 justify-center items-center bg-color-1 px-4 rounded-md">
                <FaRupeeSign className="mt-[2px]" />
                <span className="text-xl font-bold ml-1">
                  {product.price - (product.price * product.discount) / 100}
                </span>
              </div>
            </div>
            <Table className="mt-4">
              <TableBody>
                <TableRow>
                  <TableCell>Total Payable :/-</TableCell>
                  <TableCell
                    className={`${
                      product.sellingPrice * qty > 2000
                        ? "text-green-700 font-semibold"
                        : "text-red-600"
                    }`}
                  >
                    {parseInt(product.sellingPrice * qty)}/-
                  </TableCell>
                </TableRow>
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
          maxWidth="lg"
          fullScreen={isSmallScreen}
          PaperProps={{
            style: { width: isSmallScreen ? "100%" : "80%", height: "100vh" },
          }}
          uid={user?._id}
          setCopen={setCopen}
          setOpen={setOpen}
        />
      </Dialog>
    </>
  );
};

export default ProductDetails;
