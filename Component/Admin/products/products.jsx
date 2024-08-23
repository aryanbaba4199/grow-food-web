import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { getProducts } from "@/Redux/actions/productActions";
import EditProducts from "./editProducts";
import CreateProduct from "./createproduct";
import Loader from "../../helpers/loader";
import axios from "axios";
import { API_URL } from "@/Api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedProduct(null);
  };

  const deleteProduct = async (id) => {
    console.log("Deleted");
    try {
      const res = await axios.delete(`${API_URL}/products/deleteProduct/${id}`);
      if (res.status === 200) {
        onclose();
        alert("Product deleted successfully");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      alert("Bad response");
    }
  };

  return (
    <>
      {products ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {products?.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClickOpen(item)}
              className="px-2 border rounded-md flex flex-col py-2 justify-center items-center cursor-pointer shadow-sm shadow-black hover:shadow-black hover:shadow-md"
            >
              <img src={item.image[0]} className="w-24" alt={item.name} />
              <p>{item.name}</p>
              <p className="font-bold">{item.categories}</p>
              <div className=" flex gap-2">
                <FaRupeeSign className="mt-1" />
                <p>{item.price}/-</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}

      {selectedProduct && (
        <Dialog open={open} onClose={handleClose}>
          {editMode ? (
            <EditProducts
              open={editMode}
              onClose={() => setEditMode(false)}
              product={selectedProduct}
            />
          ) : createMode ? (
            <CreateProduct setCreateMode={setCreateMode} />
          ) : (
            <>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogContent>
                <img
                  src={selectedProduct.image[0]}
                  alt={selectedProduct.name}
                  className="w-24 mb-4"
                />
                <Typography variant="body1" gutterBottom>
                  {selectedProduct.description}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Brand:</strong> {selectedProduct.brand}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Category:</strong> {selectedProduct.categories}
                    </Typography>
                    <Typography variant="body2">
                      <strong>SubCategory:</strong>{" "}
                      {selectedProduct.subCategory}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Food Preference:</strong>{" "}
                      {selectedProduct.foodPrefence}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Price:</strong> {selectedProduct.price}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Discount:</strong> {selectedProduct.discount}%
                    </Typography>
                    <Typography variant="body2">
                      <strong>Available Quantity:</strong>{" "}
                      {selectedProduct.availableQty}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Product Quantity:</strong>{" "}
                      {selectedProduct.productQty}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Minimum Order Quantity:</strong>{" "}
                      {selectedProduct.minimumOrderQty}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Shelf Life:</strong> {selectedProduct.life}
                    </Typography>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className="flex justify-between">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setCreateMode(true)}
                >
                  Create
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteProduct(selectedProduct._id)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClose}
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      )}
    </>
  );
};

export default Products;
