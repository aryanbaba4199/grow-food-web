import React, { useState, useEffect, useContext, useRef } from "react";
import { getOrdersByUser, getProductbyId, updateOrderbyId, deleteOrderbyId } from "@/Api";
import axios from "axios";
import UserContext from "@/userContext";
import Loader from "@/Component/helpers/loader";
import { Dialog } from "@mui/material";
import Swal from "sweetalert2";

const Orders = () => {
  const { user } = useContext(UserContext);
  const [userAddress, setUserAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderIds, setOrdersIds] = useState([]);
  const [open, setOpen] = useState(false);
  
  const [loader, setLoader] = useState(false);

  const ref = useRef(false);

  useEffect(() => {
    if (user && user.user) {
      getOrders(user.user._id);
    }
  }, [user]);

  useEffect(() => {
    setLoader(true);
    ref.current = true;
    if (typeof window !== "undefined" && ref.current) {
      // Retrieve the address string from localStorage
      const addresses = localStorage.getItem("userAddress");

      // Check if the addresses exist and parse them
      let parsedAddresses = [];
      if (addresses) {
        try {
          parsedAddresses = JSON.parse(addresses);
        } catch (e) {
          console.error("Failed to parse address:", e);
          parsedAddresses = []; // Provide a fallback value
        }
      }

      setUserAddress(parsedAddresses);
    }
    setLoader(false);
    return () => {
      ref.current = false;
    };
  }, []);



  const getOrders = async (id) => {
    setLoader(true);
    try {
      const res = await axios.get(`${getOrdersByUser}/${id}`);
      if (res.status === 200) {
        setOrdersIds(res.data);
        const productIds = res.data.map((item) => item.productId);
        console.log(productIds);
        getProductsfromId(productIds);
        setLoader(false)
      }
    } catch (e) {
        setLoader(false)
      console.error(e);
    }
  };

  const getProductsfromId = async (productIds) => {
    setLoader(true);
    try {
      const productDetails = await Promise.all(
        productIds.map(async (id) => {
          try {
            setLoader(true);
            const res = await axios.get(`${getProductbyId}/${id}`);
            setLoader(false);
            return res.data;
            
          } catch (e) {
            console.log(e);
          }
        })
      );

      setOrders(productDetails);
      setLoader(false);
    } catch (e) {
        setLoader(false);
      console.error(e);
    }
  };

  const handleDelete = (id)=>{
   
    Swal.fire({
        title : 'Warning',
        icon : 'warning',
        text : 'Are you sure want to cancel this order',
        showDenyButton : true,
        denyButtonText : 'Close',
        confirmButtonColor : 'red',
        denyButtonColor : 'black',
        confirmButtonText : 'Cancel Order',
    }).then((result)=>{
        if(result.isConfirmed){
            
            const deleteing = async(id)=>{
                setLoader(true);
                try{
                    const res = await axios.delete(`${deleteOrderbyId}/${id}`)
                    if(res.status===200){
                        Swal.fire({
                            title : 'Cancelled',
                            icon : 'success',
                            text : 'Order Cancelled successfully...',
                        })
                        getOrders(user.user._id)
                        setLoader(false)
                    }
                }catch(error){
                   console.error(error)
                   Swal.fire({
                    title : 'Failure',
                    icon : 'error',
                    text : error.message,
                   }) 
                   setLoader(false)    
                }
            }
            deleteing(id);
            
        }
    })
  }

  const handleupdate=async()=>{
    

  }

  

  return (
    <>
    {loader  ?<Loader/>  : 
    <>
      <div className="">
        <div className="flex justify-center items-center mt-2">
          <span className="bg-color-1 px-4 py-1 text-xl rounded-md">
            Your Orders
          </span>
        </div>
        {orderIds.map((item, index) => (
          <div
            key={index}
            onClick={()=>{
                Swal.fire({
                    title: "Make Changes in this Order",
                    showDenyButton: true,
                    showCancelButton: true,
                    denyButtonText: `Delete`,
                    confirmButtonText: "Update",
                  }).then((result) => {
                    
                    if (result.isConfirmed) {
                      handleupdate(item._id);
                    } else if (result.isDenied) {
                      handleDelete(item._id);
                    }
                  });
            }}
            className="flex flex-col gap-2 md:flex-row justify-between py-1 px-2 mt-2 shadow-md shadow-green-600"
          >
            <div className="flex-1 flex justify-evenly items-center">
              <img
                src={orders[index]?.image}
                alt="Grow Food"
                className="w-24 h-24 rounded-md"
              />
              <div className="flex flex-col pl-4">
                <span className="bg-color-1  px-2 text-green-700 font-semibold rounded-sm w-full">
                  Product Details
                </span>
                <span>{orders[index]?.name}</span>
                <span>{orders[index]?.categories}</span>
                <span>Price : {orders[index]?.price}/-</span>
                <span>Discount : {orders[index]?.discount}%</span>
              </div>
            </div>
            <div className="flex-1">
              <div>
                <span className="bg-color-1  px-2 text-green-700 font-semibold rounded-sm w-full">
                  Delivery Address
                </span>
              </div>

              <span>
                {
                  userAddress.find(
                    (item) => item._id === orderIds[index]?.addressId
                  ).name
                }
              </span>
              <span>
                {
                  userAddress.find(
                    (item) => item._id === orderIds[index]?.addressId
                  ).mobile
                }
              </span>
              <div className="flex gap-2">
                <span>
                  {
                    userAddress.find(
                      (item) => item._id === orderIds[index]?.addressId
                    ).landmark
                  }
                </span>
                <span>
                  {
                    userAddress.find(
                      (item) => item._id === orderIds[index]?.addressId
                    ).locality
                  }
                </span>
                <span>
                  {
                    userAddress.find(
                      (item) => item._id === orderIds[index]?.addressId
                    ).city
                  }
                </span>
                <span>
                  {
                    userAddress.find(
                      (item) => item._id === orderIds[index]?.addressId
                    ).state
                  }
                </span>
                <span>
                  {" "}
                  -{" "}
                  {
                    userAddress.find(
                      (item) => item._id === orderIds[index]?.addressId
                    ).zip
                  }
                </span>
              </div>
            </div>
            <div className="flex-1 flex-flex-row justify-center items-center">
              <div>
                <span className="bg-color-1  px-2 text-green-700 font-semibold rounded-sm w-full">
                  Order Details
                </span>
              </div>
              <div className="flex flex-col">
                <span>Quantity : {item.quantity}</span>
                <span>Order Date : {item.date.split("T")[0]}</span>
                <span>Amount : {item.orderAmount}/-</span>
                <span>Status : {item.status ?? "Not Processed"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      </>
}
    </>
  );
};

export default Orders;
