import React, { useState, useEffect, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import products from '@/pages/admin/products';


const EditOrder = ({ open, setOpen, order, onUpdate, onDelete, productDetails }) => {
  const [updatedOrder, setUpdatedOrder] = useState({});
  const [showFailureReason, setShowFailureReason] = useState(false);

  useEffect(() => {
    setUpdatedOrder({ ...order });
    if (updatedOrder.status === 'Failure') {
      setShowFailureReason(true);
    } else {
      setShowFailureReason(false);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder({ ...updatedOrder, [name]: value });

    // Show the failure reason field if "Failure" is selected
    if (name === 'status' && value === 'Failure') {
      setShowFailureReason(true);
    } else if (name === 'status') {
      setShowFailureReason(false);
    }
  };

  const handleUpdate = () => {
    onUpdate(updatedOrder);
  };

  console.table('Data', order);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="User Name"
          name="userName"
          value={products.userName || ''}
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

        {/* Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={updatedOrder.status || ''}
            onChange={handleChange}
          >
            <MenuItem value="Not Processed">Not Processed</MenuItem>
            <MenuItem value="Processed">Processed</MenuItem>
            <MenuItem value="In Shipment">In Shipment</MenuItem>
            <MenuItem value="Ready to Deliver">Ready to Deliver</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Failure">Failure</MenuItem>
          </Select>
        </FormControl>

        {/* Conditionally Render the Failure Reason Field */}
        {showFailureReason && (
          <TextField
            fullWidth
            label="Failure Reason"
            name="failureReason"
            value={updatedOrder.failureReason || ''}
            onChange={handleChange}
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() =>setOpen(false)} color="secondary">
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
