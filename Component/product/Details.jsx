import React, { useState, useContext, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaStar, FaRupeeSign } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UserContext from "@/userContext";
import Checkout from "../checkout/checkout";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import axios from "axios";
import { createCartbyUser } from "@/Api";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { decryptData } from "@/Context/userFunction";
import { memoize } from "@/Context/productFunction";

const Details = ({ productData }) => {
  const [checkoutProduct, setCheckoutProduct] = useState([]);
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState(null); // Start with null or undefined
  const [qty, setQty] = useState(0);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { token, user, searchInput } = useContext(UserContext);

  useEffect(() => {
    if (productData) {
      setProduct({ ...productData });
      setQty(productData.minimumOrderQty);
    }
  }, [productData]);

  useEffect(() => {
    if (searchInput !== "") {
      const storedProducts = localStorage.getItem("products");
      const decryptedProducts = storedProducts
        ? decryptData(storedProducts)
        : [];

      // Find the first product that matches the search input (case-insensitive)
      const searchedProduct = decryptedProducts.find((item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setProduct(searchedProduct || {});
    }
  }, [searchInput]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const responsive = {
    superLargeDesktop: {
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

  const handleBuyNow = () => {
    if (token !== "") {
      setCheckoutProduct([product]);
      setEmail(user?.user?.email);
      setOpen(true);
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
    } else {
      setQty(qty - (product.incDecBy !== undefined ? product.incDecBy : 1));
    }
  };

  const handleIncrement = () => {
    if (qty > product.availableQty) {
      Swal.fire(`Minimum Order Quantity is : ${qty}`);
    } else {
      setQty(qty + (product.incDecBy !== undefined ? product.incDecBy : 1));
    }
  };

  return (
    <>
      {product === null ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-col md:flex-row justify-between  mt-8 px-4 gap-8 md:mb-0 mb-8">
            <div className="flex flex-col items-center w-full md:w-[45%]">
              <Carousel
                className="w-full h-auto"
                swipeable={true}
                draggable={true}
                showDots={true}
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
                {(product.image.length === 0
                  ? [
                      "https://www.nbu.ac.in/img/dept/anthropology/slider/slider3.jpg",
                    ]
                  : product.image
                ).map((imageUri, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={
                        imageUri
                          ? imageUri
                          : "https://www.nbu.ac.in/img/dept/anthropology/slider/slider3.jpg"
                      }
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-96 rounded-md"
                    />
                  </div>
                ))}
              </Carousel>

              <div className="flex gap-4 text-xl border border-gray-300 px-4 py-1 justify-between items-center mt-2 shadow-md rounded-2xl">
                <Tooltip title="Decrease Quantity">
                  <IconButton
                    onClick={handleDecrement}
                    size="small"
                    color="inherit"
                  >
                    <FaCircleMinus />
                  </IconButton>
                </Tooltip>
                <span>{qty ?? product.minimumOrderQty}</span>
                <Tooltip title="Increase Quantity">
                  <IconButton
                    onClick={handleIncrement}
                    size="small"
                    color="success"
                  >
                    <FaCirclePlus className="" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="mt-4 z-[200] w-full flex gap-2 justify-center md:relative fixed bottom-0 items-center">
                <Button
                  onClick={handleCart}
                  variant="contained"
                  disabled={product.display === false}
                  color="warning"
                  className="w-[50%]"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  disabled={product.display === false}
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
                      {product.sellingPrice ?? 100}
                    </span>
                  </div>
                </div>
                <Table className="mt-4">
                  <TableBody>
                    {product.display === false && (
                      <TableRow>
                        <TableCell>
                          <span className="text-red-600 font-semibold">
                            Out of Stock
                          </span>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>Total Payable :</TableCell>
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
                      <TableCell>
                        {product.productQty} {product.unit}
                      </TableCell>
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
              </div>
            </div>
          </div>
          <p className="text-gray-700 mt-4">{product.description}</p>
        </div>
      )}
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        onClose={() => setOpen(false)}
        fullScreen
      >
        <Checkout
          products={checkoutProduct}
          qty={[qty]}
          maxWidth="lg"
          // fullScreen={isSmallScreen}
          // PaperProps={{
          //   style: { width: isSmallScreen ? "100%" : "80%", height: "100vh" },
          // }}
          open={open}
          uid={user?._id}
          setCopen={setOpen}
          // setOpen={setOpen}
        />
      </Dialog>
    </>
  );
};

export default Details;
