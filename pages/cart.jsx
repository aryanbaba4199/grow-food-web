import React, { useEffect, useState, useRef } from "react";
import { getCartbyUser, getProductbyId, deleteCartItem } from "@/Api";
import axios from "axios";
import ProductCard from "../Component/Home/productCard";
import Swal from "sweetalert2";
import Loader from "@/Component/helpers/loader";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { Button, Dialog, Typography } from "@mui/material";
import Checkout from "@/Component/checkout/checkout";
import { decryptData, encryptData } from "@/Context/userFunction";
import Head from "next/head";
import products from "./admin/products";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [userCartIds, setUserCartIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState([]);
  const ref = useRef(false);
  const router = useRouter();

  useEffect(() => {
    ref.current = true;
    if (typeof window !== "undefined" && ref.current) {
      const userid = localStorage?.getItem("user")
        ? localStorage.getItem("user")
        : "";
      if (userid !== "") {
        const user = decryptData(userid);
        setUserId(user.user._id);
        getCartData(user.user._id);
      }
    }
    return () => {
      ref.current = false;
    };
  }, []);

  const getCartData = async (id) => {
    setLoader(true);
    try {
      const res = await axios.get(`${getCartbyUser}/${id}`);
      if (res.status === 200) {
        const groupedProducts = res.data.reduce((acc, item) => {
          if (!acc[item.productId]) {
            acc[item.productId] = { ...item, qty: item.qty };
          } else {
            acc[item.productId].qty += item.qty;
          }
          setLoader(false);
          return acc;
        }, {});

        const productIds = Object.keys(groupedProducts);
        setUserCartIds(Object.values(groupedProducts));
        getProductsfromId(productIds);
      }
    } catch (e) {
      setLoader(false);
      console.error(e);
    }
  };

  useEffect(() => {
    const product = decryptData(localStorage.getItem("products")).filter(
      (item) => userCartIds.map((id) => id.productId).includes(item._id)
    );
    setCartData(product);

    for (let i = 0; i < product.length; i++) {
      qty.push(userCartIds[i].qty);
    }
  }, [userCartIds, loader]);
  console.log(qty);

  // const getProductsfromId = async (productIds) => {
  //   try {
  //     const productDetails = await Promise.all(
  //       productIds.map(async (id) => {
  //         const res = await axios.get(`${getProductbyId}/${id}`);
  //         return res.data;
  //       })
  //     );
  //     setCartData(productDetails);
  //     setLoader(false);
  //   } catch (e) {
  //     console.error(e);
  //     setLoader(false);
  //   }
  // };

  const deleteCart = async (id) => {
    setLoader(true);
    try {
      const res = await axios.delete(`${deleteCartItem}/${id}`);
      if (res.status === 200) {
        Swal.fire({
          title: "Deleted",
          icon: "success",
          text: res.data.message,
        });
        getCartData(user.user._id);
        userCartIds.splice(userCartIds.indexOf(id)._id, 1);
        setLoader(false);
      }
    } catch (e) {
      // Swal.fire({
      //   title: "Failed",
      //   icon: "error",
      //   text: e.message,
      // });
      setLoader(false);
      console.error(e);
    }
  };

  const handleCheckoutAll = () => {
    if (cartData.length > 0) {
      setOpen(true);
    } else {
      Swal.fire({
        title: "No Items",
        icon: "info",
        text: "Your cart is empty.",
      });
    }
  };

  console.log(cartData);
  return (
    <>
      <Head>
        <title>The Grow Food</title>
        <meta
          name="description"
          content="The Grow Food Is B2B solution for Restaurants"
        />
        <meta name="keywords" content=" Rastaurants, Hotels, Foods, B2B" />
      </Head>
      {loader ? (
        <Loader />
      ) : (
        <div>
          {userId === "" && (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center text-2xl font-semibold">
              <p>Log in to see your cart details</p>
            </div>
          )}
          {userId !== "" && cartData.length === 0 && (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center text-2xl font-semibold">
              <p>No Cart Item Found</p>
            </div>
          )}
          <div className="md:flex grid grid-cols-2 md:mt-2 mt-14 flex-row gap-4 flex-wrap justify-between w-fit  px-4">
            {cartData.map((item, index) => (
              <>
                <div>
                  <div
                    onClick={() => {
                      const id = encryptData(item._id);

                      router.push(
                        `/ProductDetails?thegrowfood=${encodeURIComponent(id)}`
                      );
                    }}
                  >
                    <ProductCard
                      item={item}
                      key={index}
                      qty={
                        userCartIds.find((cart) => cart.productId === item._id)
                          ?.qty
                      }
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="txt-1">
                      Quantity : {userCartIds[index]?.qty}
                    </span>
                    <Button
                      variant="contained"
                      color="warning"
                      style={{
                        padding: 2,
                        paddingLeft: 5,
                        paddingRight: 5,
                        margin: 0,
                      }}
                      onClick={() => deleteCart(userCartIds[index]?._id)}
                    >
                      Delete Cart
                    </Button>
                  </div>
                </div>
              </>
            ))}
          </div>
          {userId !== "" && cartData.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleCheckoutAll}
                className="bg-color-1 text-white px-4 py-2 rounded-md font-semibold"
              >
                Checkout All
              </button>
            </div>
          )}
        </div>
      )}
      <Dialog open={open} fullScreen>
        <Checkout products={cartData} setCopen={setOpen} qty={qty} />
      </Dialog>
    </>
  );
};

export default Cart;
