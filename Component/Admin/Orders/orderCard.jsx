import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/Redux/actions/productActions";
import { fetchUserDetails } from "@/Redux/actions/userAuthAction";
import { Dialog, Tooltip } from "@mui/material";
import { MdModeEditOutline, MdDelete } from "react-icons/md";

import EditOrder from "./editOrder";

const OrderCard = ({ order }) => {
  const [editMode, setEditMode] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.user);
  const product = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(getProduct(order.productId));
  }, [dispatch, order.productId]);

  useEffect(() => {
    if (product) {
      setProductDetails(Object.values(product));
    }
  }, [product]);

  const handleEdit = () => {
    setEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setEditMode(false);
  };

  const handleUpdate = (updatedDetails) => {
    // Handle the update logic here
    console.log("Updated Details: ", updatedDetails);
    setEditMode(false);
  };

  const handleDelete = () => {
    // Handle the delete logic here
    console.log("Order deleted");
    setEditMode(false);
  };

  const shipmentStatus = [
    "Order Created",
    "Shipped",
    "Dispatched",
    "Out for delivery",
  ];

  return (
    <div onClick={handleEdit} className="border border-gray-200 rounded p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-2">Order Details</h3>
      <p>
        <strong>User Name:</strong>{" "}
        {userDetails ? userDetails.name : "Loading..."}
      </p>
      <p>
        <strong>Product Name:</strong> {product ? product.name : "Loading..."}
      </p>
      <p>
        <strong>Product Category:</strong> {product ? product.category : "Loading..."}
      </p>
      <p>
        <strong>Quantity:</strong> {order.quantity}
      </p>
      <p>
        <strong>Order Amount:</strong> ${order.orderAmount}
      </p>
      <p>
        <strong>Payment Mode:</strong> {order.paymentMode}
      </p>
      <p>
        <strong>Payment ID:</strong> {order.paymentId}
      </p>

      <Dialog open={editMode} onClose={handleClose}>
        
        <EditOrder
          productDetails={productDetails}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          open = {open}
          setOpen = {setOpen}
        />
      </Dialog>
    </div>
  );
};

export default OrderCard;
