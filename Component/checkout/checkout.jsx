import React, { useEffect, useState, useContext } from "react";
import { getuserAddress, createOrderAPI } from "@/Api";
import UserContext from "@/userContext";
import { Card, CardContent, Typography, Button, Grid, Table, TableBody, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { FaCheckDouble } from "react-icons/fa";

const Checkout = ({ products, quantities, setCopen, setOpen, deleteCart, qty }) => {
  const [address, setAddress] = useState(null);
  const [addressId, setAddressId] = useState("");
  const [calculatedPrices, setCalculatedPrices] = useState([]);
  const router = useRouter();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.user) getAddress();
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && quantities?.length > 0 || qty) {
      const newCalculatedPrices = products.map(item => {
        const quantity = quantities?.find(cart => cart?.productId === item?._id)?.qty || qty;
        const totalPrice = quantity * item.sellingPrice;
        return { productId: item._id, quantity, totalPrice };
      });
      setCalculatedPrices(newCalculatedPrices);
    }
  }, [products, quantities]);

  const getAddress = async () => {
    try {
      const res = await axios.get(`${getuserAddress}/${user.user._id}`);
      if (res.status === 200) setAddress(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheckOut = async () => {
    if (!addressId) {
      alert("Please select an address");
      return;
    }

    const orderDetails = calculatedPrices.map(item => ({
      productId: item.productId,
      userId: user.user._id,
      addressId,
      quantity: item.quantity,
      paymentId: "na",
      paymentMode: "COD",
      orderAmount: item.totalPrice
    }));

    try {
      const res = await axios.post(createOrderAPI, { orders: orderDetails });
      if (res.status === 200) {
        Swal.fire("Success", "Order Created Successfully", "success");
        setOpen(false);
        setCopen(false);
        router.push("/");
      }
      if(deleteCart!==undefined){
        deleteCart();
      }
    } catch (e) {
      Swal.fire("Error", e.message, "error");
    }
  };

  const totalPayable = calculatedPrices.reduce((acc, item) => acc + item.totalPrice, 0);

  useEffect(() => {
    const totalPayable = products.reduce(
      (acc, product) => acc + product.sellingPrice * qty, 
      0
    );
  
    if (totalPayable < 2000) {
      Swal.fire({
        title: 'Minimum Order: 2000/-',
        icon: 'info',
        text: `You have to create an order amount of a minimum of 2000/- currently: ${totalPayable}`
      });
      setCopen(false);
    }
  }, [products, qty]); 
  
  

  return (
    <>
      <button className="absolute top-4 right-4 z-10">
        <IoMdCloseCircle className="text-3xl text-red-600 cursor-pointer" onClick={() => setCopen(false)} />
      </button>

      <div className="container mx-auto p-4">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card className="shadow-lg">
              <CardContent>
                <Typography variant="h6" className="bg-color-1 text-white px-4 py-2 rounded-md">
                  Delivery Address
                </Typography>
                <div className="mt-4">
                  {address ? (
                    address.map((item) => (
                      <div
                        key={item._id}
                        className={`border p-4 mb-2 rounded-md cursor-pointer ${addressId === item._id ? "border-green-600" : "border-gray-300"}`}
                        onClick={() => setAddressId(item._id)}
                      >
                        <span>Name: {item.name}</span>
                        <div className="flex justify-between items-center">
                          <span>{item.mobile}</span>
                          {addressId === item._id && <FaCheckDouble className="text-green-600" />}
                        </div>
                        <div className="text-sm text-gray-700">
                          {item.landmark}, {item.locality}, {item.city}, {item.state} - {item.zip}
                        </div>
                      </div>
                    ))
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
                <Typography variant="h6" className="bg-color-1 text-white px-4 py-2 rounded-md">
                  Product Details
                </Typography>
                <Table className="mt-4">
                  <TableBody>
                    <TableRow>
                      <TableCell><strong>Product Name</strong></TableCell>
                      <TableCell><strong>Quantity</strong></TableCell>
                      <TableCell><strong>Rate</strong></TableCell>
                      <TableCell><strong>Total</strong></TableCell>
                    </TableRow>
                    {calculatedPrices.map((item) => {
                      const product = products.find(prod => prod._id === item.productId);
                      return (
                        <TableRow key={item.productId}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{product.sellingPrice}</TableCell>
                          <TableCell>{item.totalPrice}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                <div className="mt-4 text-right">
                  <Typography variant="h6">Total Payable: {totalPayable}/-</Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleCheckOut}
            className="bg-color-1 text-white px-4 py-2 rounded-md font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
