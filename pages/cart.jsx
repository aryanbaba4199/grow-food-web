import React, { useEffect, useState, useRef } from "react";
import { getCartbyUser, getProductbyId, deleteCartItem } from "@/Api";
import axios from "axios";
import ProductCard from "../Component/Home/productCard";
import Swal from "sweetalert2";
import Loader from "@/Component/helpers/loader";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [userCartIds, setUserCartIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [loader, setLoader] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    ref.current = true;
    if (typeof window !== "undefined" && ref.current) {
      const userid = localStorage?.getItem("user")
        ? localStorage.getItem("user")
        : "";
      if (userid !== "") {
        const user = JSON.parse(userid);
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
        // Group products by productId and sum their quantities
        const groupedProducts = res.data.reduce((acc, item) => {
          if (!acc[item.productId]) {
            acc[item.productId] = { ...item, qty: item.qty };
          } else {
            acc[item.productId].qty += item.qty; // Sum quantities for duplicate productId
          }
          return acc;
        }, {});

        const productIds = Object.keys(groupedProducts);
        setUserCartIds(Object.values(groupedProducts)); // Set grouped products to state
        getProductsfromId(productIds);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getProductsfromId = async (productIds) => {
    try {
      const productDetails = await Promise.all(
        productIds.map(async (id) => {
          const res = await axios.get(`${getProductbyId}/${id}`);
          return res.data;
        })
      );
      setCartData(productDetails);
      setLoader(false);
    } catch (e) {
      console.error(e);
      setLoader(false);
    }
  };

  const deleteCart = async (productId) => {
    setLoader(true);
    const cartId = userCartIds.find((item) => item.productId === productId);
    const id = cartId._id;
    try {
      const res = await axios.delete(`${deleteCartItem}/${id}`);
      if (res.status === 200) {
        Swal.fire({
          title: "Deleted",
          icon: "success",
          text: res.data.message,
        });
        getCartData(userId);
        setLoader(false);
      }
    } catch (e) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: e.message,
      });
      setLoader(false);
      console.error(e);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          {userId === "" && (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center text-2xl font-semibold">
              <p>Log in to see your cart details</p>
            </div>
          )}
          {userId !== "" && cartData.length == 0 && (
            <div className="w-[100vw] h-[100vh] flex justify-center items-center text-2xl font-semibold">
              <p>No Cart Item Found</p>
            </div>
          )}
          <div className="flex flex-row gap-4 flex-wrap justify-between w-fit mt-2 px-4">
            {cartData.map((item, index) => (
              <ProductCard
                item={item}
                key={index}
                isCart={true}
                deleteCartItem={deleteCart}
                qty={userCartIds.find((cart) => cart.productId === item._id)?.qty}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
