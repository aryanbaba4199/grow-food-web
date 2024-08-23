import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const EditOrder = ({ open, setOpen, order, onUpdate, onDelete }) => {
  const [updatedOrder, setUpdatedOrder] = useState({});

  useEffect(() => {
    setUpdatedOrder({ ...order });
  }, [order]);

  const handleChange = (e) => {
    setUpdatedOrder({ ...updatedOrder, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(updatedOrder);
  };

  return (
    <Dialog open={open} onClose={()=>setOpen(false)}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="User Name"
          name="userName"
          value={updatedOrder.userName || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Name"
          name="productName"
          value={updatedOrder.productName || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Product Category"
          name="productCategory"
          value={updatedOrder.productCategory || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          value={updatedOrder.quantity || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Order Amount"
          name="orderAmount"
          value={updatedOrder.orderAmount || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Payment Mode"
          name="paymentMode"
          value={updatedOrder.paymentMode || ''}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Payment ID"
          name="paymentId"
          value={updatedOrder.paymentId || ''}
          onChange={handleChange}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrder;
