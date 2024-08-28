import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  Grid,
  IconButton,
} from "@mui/material";
import { getProduct } from "@/Redux/actions/productActions";
import { fetchUserDetails } from "@/Redux/actions/userAuthAction";
import EditOrder from "./editOrder";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";
import { deleteOrderbyId } from "@/Api";
import { fetchOrders } from "@/Redux/actions/orderAction";


const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.products.products);

  // Fetch user details and product information
  useEffect(() => {
    if (!userDetails) dispatch(fetchUserDetails());
    if (order.productId) dispatch(getProduct(order.productId));
  }, [dispatch, order.productId, userDetails]);

  const handleOpen = () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: `Delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setOpen(true);
      } else if (result.isDenied) {
        Swal.fire({
          title : 'Confirm',
          icon: 'warning',
          text : 'Are you sure you want to Delete',
          showCancelButton : true,
          cancelButtonText : 'Cancel',
          showConfirmButton : true,
          confirmButtonText : 'Delete',
        }).then((result) => {
          if(result.isConfirmed){
            handleDelete();
          }else if(result.isDenied){
            close();
          }
        });
      
      }
    });
  };

  

  

  

  const handleUpdate = (updatedDetails) => {
    console.log("Updated Details: ", updatedDetails);
    setOpen(false);
  };

  const handleDelete = async() => {
    try{
      const res = await axios.delete(`${deleteOrderbyId}/${order._id}`);
      if(res.status=== 200){
        Swal.fire({
          title: "Deleted",
          icon: "success",
          text : 'Order deleted successfully...'
        })
        dispatch(fetchOrders())
      }
    }catch(err){
      console.log("Error", err);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: err.message
      });
    }
    setOpen(false);
  };

  return (
    <>
    <Card
      sx={{ maxWidth: 345, m: 2, boxShadow: 3, cursor: "pointer" }}
      onClick={handleOpen}
    >
      <CardContent>
        <div className="flex justify-between items-center">
        <Typography variant="h6" component="div" gutterBottom>
          Order Details
        </Typography>
          
        </div>
        <Typography variant="body2" color="text.secondary">
          <strong>User Id:</strong>{" "}
          {userDetails ? order.userId : "Loading..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>User Name:</strong>{" "}
          {userDetails ? userDetails.user.name : "Loading..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Product Name:</strong> {product ? product.name : "Loading..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Product Category:</strong>{" "}
          {product ? product.category : "Loading..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Quantity:</strong> {order.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Order Amount:</strong> ${order.orderAmount}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Payment Mode:</strong> {order.paymentMode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Payment ID:</strong> {order.paymentId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Payment ID:</strong> {(order.date).split('T')[0]}
        </Typography>
        <Typography variant="body2">
          <strong>Status :</strong> {order.status}
        </Typography>
      </CardContent>
      
    </Card>
    {open &&
      <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm">
        <EditOrder
          order={order}
          productDetails={product}
          onUpdate={handleUpdate}
          setOpen={setOpen}
        />
      </Dialog>
}
    </>
  );
};

export default OrderCard;
