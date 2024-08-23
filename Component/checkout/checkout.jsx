import React, { useEffect, useState, useContext } from "react";
import { getDeliveryAddress } from "@/Api";

import UserContext from "@/userContext";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { IoMdCloseCircle } from "react-icons/io";
import { createOrder } from "@/Redux/actions/orderAction";
import axios from "axios";

const Checkout = ({ product, email, qty, uid, setCopen }) => {

  const [address, setAddress] = useState(null);
  const router = useRouter();
  const {user} = useContext(UserContext);

  


  useEffect(() => {
    if (user.user) {
      getAddress();
      
    }
  }, [user]);

  const getAddress = async()=>{
    try{
      const res = await axios.get(`${getDeliveryAddress}/${user.user._id}`);
      if(res.status===200){
        console.log('Success', res.data)
        setAddress(res.data);
      }
    }catch(e){
      console.error (e);
    }
  }


  const handleCheckOut = () => {
    
    const productId = product._id;
    const userId = uid;
    const quantity = qty;
    const paymentId = "na";
    const paymentMode = "COD"; 
    const orderAmount = product.sellingPrice || 10 * qty;

    const order = {
      productId,
      userId,
      quantity,
      paymentId,
      paymentMode,
      orderAmount,
    };

    

    try {
      console.log(order);
      alert("Order created");
      dispatch(createOrder(order));
      router.push("/");
    } catch (e) {
      console.log(e);
      alert("Error creating order");
    }
  };
  console.log(address);

  return (
    <>
    <div className="flex justify-end items-start px-4">
        <button>
          <IoMdCloseCircle
            className="text-3xl text-red-600 hover:cursor-pointer"
            onClick={() => setCopen(false)}
          />
        </button>
      </div>
    <div className="container mx-auto py-8">
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography
                variant="h6"
                className="bg-blue-800 text-white px-4 py-2 rounded-md"
              >
                Delivery Address
              </Typography>
              <div className="mt-4">
                {address ? (
                  <div className="font-semibold px-8 flex flex-col gap-2">
                    <span>{address.name},</span>
                    <span>{user.mobile}</span>
                    <span>{address.address},</span>
                    <span>{address.city},</span>
                    <span>{address.state},</span>
                    <span>{address.zip}</span>
                  </div>
                ) : (
                  <Typography>Loading address...</Typography>
                )}
              </div>
              <div className="w-full text-center mt-8">
                <Button variant="contained" color="primary">
                  Add New Address
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography
                variant="h6"
                className="bg-blue-800 text-white px-4 py-2 rounded-md"
              >
                Product Details
              </Typography>
              <div className="px-8 mt-4">
                <div className="grid grid-cols-1 gap-2">
                  <Typography>Total Product: 1</Typography>
                  <Typography>Quantity: {qty}</Typography>
                  <Typography>Delivery Charges: Free</Typography>
                  <Typography>Total Amount: {product.price * qty}/-</Typography>
                  <Typography>
                    Discounted Amount:{" "}
                    {(product.price * product.discount) / 100}/-
                  </Typography>
                  <Typography>
                    Total Payable: {product.sellingPrice || 10 * qty}/-
                  </Typography>
                </div>
                <div className="mt-8">
                  <Button variant="contained" color="primary">
                    Product Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <div className="flex justify-center items-center">
        <button
          onClick={handleCheckOut}
          className="mt-8 bg-green-600 text-white px-4 py-2 rounded-md font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
    </>
  );
};

export default Checkout;
