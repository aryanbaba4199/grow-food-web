import React, { useState, useEffect } from "react";
import { API_URL } from "@/Api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";


const EditProducts = ({ open, onClose, product, setOpen }) => {
  const [formData, setFormData] = useState({ ...product });

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async() => {
      try{
        const res = await axios.put(`${API_URL}/api/products/updateProduct`, {formData})
        if(res.status ===200){
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text : 'Product updated successfully'
          })
          setOpen(false);
        }
      }catch(err){
        Swal.fire({
          title : 'Error',
          icon: 'error',
          text : err.message
        });
        console.log(err);
      }
  };


  

  const inputFields = Object.keys(formData).filter((key)=>key!=="_id" && key!=="__v").map((key) => (
    <Grid item xs={12} key={key}>
      <TextField
        fullWidth
        label={key.charAt(0).toUpperCase() + key.slice(1)}
        name={key}
        value={formData[key]}
        onChange={handleChange}
        disabled={key==="sellingPrice"}
        margin="normal"
      />
    </Grid>
  ));

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {inputFields}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProducts;
