import React, { useEffect, useState, useContext } from "react";
import { getuserAddress } from "@/Api";
import { createOrderAPI } from "@/Api";
import UserContext from "@/userContext";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { IoMdCloseCircle } from "react-icons/io";
import { createOrder } from "@/Redux/actions/orderAction";
import axios from "axios";
import { FaCheckDouble } from "react-icons/fa";
const Checkout = ({ product, email, qty, uid, setCopen, setOpen }) => {
  const [address, setAddress] = useState(null);
  const [addressId, setAddressId] = useState("");
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.user) {
      getAddress();
    }
  }, [user]);
  console.log(typeof user);
  const getAddress = async () => {
    console.log(user);
    try {
      const res = await axios.get(`${getuserAddress}/${user.user._id}`);
      if (res.status === 200) {
        console.log("Success", res.data);
        setAddress(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckOut = async () => {
    if (addressId === "") {
      alert("Please select an address");
      return;
    }
    const productId = product._id;
    const userId = user.user._id;
    const quantity = qty;
    const paymentId = "na";
    const paymentMode = "COD";
    const orderAmount = product.sellingPrice || 10 * qty;
    const order = {
      productId,
      userId,
      addressId,
      quantity,
      paymentId,
      paymentMode,
      orderAmount,
    };

    try {
      const res = await axios.post(createOrderAPI, { order });
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Order Created Successfully",
        });
        setOpen(false);
        setCopen(false);
      }
      router.push("/");
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: e.message,
      });
    }
  };
  console.table(address);
  useEffect(()=>{
    if(product.sellingPrice*qty<2000){
      Swal.fire({
        icon : 'info',
        title : `Order Amount : ${product.sellingPrice*qty}/-`,
        text : `Order Amount can not be less than 2000/-`
      })
      setCopen(false);
    }
    
  }, []);

  return (
    <>
      <button className="z-10 float-end self-end md:mt-0 mt-8">
          <IoMdCloseCircle
            className="text-3xl text-red-600 hover:cursor-pointer"
            onClick={()=>setCopen(false)}
          />
        </button>
        
      
      <div className="container mx-auto py-2">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            
            <Card className="shadow-lg">
              <CardContent>
                <Typography
                  variant="h6"
                  className="bg-color-1 text-white px-4 py-2 rounded-md"
                >
                  Delivery Address
                </Typography>
                <div className="mt-4">
                  {address ? (
                    <>
                      {address.map((item, i) => (
                        <div
                          className={`shadow-md shadow-green-600 mt-2 font-semibold px-8 flex  flex-col py-1 gap-2 ${
                            addressId !== "" && addressId === item._id
                              ? "shadow-green-700 blur-0"
                              : "blur-[1px]"
                          }`}
                          onClick={() => setAddressId(item._id)}
                        >
                          <span>Name : {item.name}</span>
                          <div className="flex justify-between items-center">
                            <span>{item.mobile}</span>
                            {addressId !== "" && addressId === item._id && (
                              <FaCheckDouble className="text-green-600" />
                            )}
                          </div>

                          <div className="flex flex-row gap-2 text-sm text-gray-700">
                            <span>{item.landmark}</span>
                            <span>{item.locality}</span>
                            <span>{item.city}</span>
                            <span>{item.state}</span>
                            <span>{item.zip}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <Typography>Loading address...</Typography>
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography
                  variant="h6"
                  className="bg-color-1 text-white px-4 py-2 rounded-md"
                >
                  Product Details
                </Typography>
                <div className="px-8 mt-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Typography>Total Product: 1</Typography>
                    <Typography>Quantity: {qty}</Typography>
                    <Typography>Delivery Charges: Free</Typography>
                    <Typography>
                      Total Amount: {product.price * qty}/-
                    </Typography>
                    <Typography>
                      Discounted Amount:{" "}
                      {((product.price * product.discount) / 100)*qty}/-
                    </Typography>
                    <Typography>
                      Total Payable: {product.sellingPrice*qty}/-
                    </Typography>
                  </div>
                  
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className="flex justify-center items-center">
          <button
            onClick={handleCheckOut}
            className="mt-8 bg-color-1 text-white px-4 py-2 rounded-md font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
