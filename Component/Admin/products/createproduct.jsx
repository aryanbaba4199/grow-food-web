import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@/Api";
import axios from "axios";

import { getBrands, getCategories } from "@/Redux/actions/productActions"; // Adjust the import path as needed
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";

const CreateProduct = ({ setCreateMode }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.products.brands);
  const categories = useSelector((state) => state.products.categories);

  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState("");
  const [tempImageUrl, setTempImageURL] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    brand: "",
    categories: "",
    subCategory: "",
    image: "",
    discount: 0,
    price: 0,
    sellingPrice: 0,
    unit: "",
    productQty: 0,
    minimumOrderQty: 0,
    availableQty: 0,
    foodPrefence: "",
    life: "",
    incDecBy: 0,
  });

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBrands(brands);
  }, [brands]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setProductData({ ...productData, brand: value });
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBrands(filtered.length > 0 ? filtered : [{ name: value }]);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setProductData({ ...productData, categories: value });
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered.length > 0 ? filtered : [{ name: value }]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(createProduct, productData, {});
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Product Created successfully",
          icon: "success",
        });
        setProductData({
          name: "",
          description: "",
          brand: "",
          categories: "",
          subCategory: "",
          image: "",
          discount: 0,
          price: 0,
          sellingPrice: 0,
          productQty: "",
          minimumOrderQty: 0,
          availableQty: 0,
          foodPrefence: "",
          life: "",
        });
      }
    } catch (e) {
      await removeImage();
      console.log("Failed to upload");
      Swal.fire({
        title: "Error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const removeImage = async () => {
    try {
      await axios.delete(
        `https://api.cloudinary.com/v1_1/dvhuttonp/image/destroy`,
        { public_id: imageId }
      );
      console.log("Image deleted from Cloudinary");
    } catch (e) {
      console.error("Error deleting image from Cloudinary:", e);
    }
  };

  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage) {
      const tempUrl = URL.createObjectURL(selectImage);
      setTempImageURL(tempUrl);
      setImage(selectImage);
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dreamplanner4199");
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/dvhuttonp/image/upload`,
        formData
      );

      const climageUrl = cloudinaryResponse.data.secure_url;
      setImageId(cloudinaryResponse.data.public_id);

      setProductData((prevData) => ({ ...prevData, image: climageUrl }));

      // Call handleSubmit after the image is uploaded
      await handleSubmit();

    } catch (e) {
      console.error(e);
      await removeImage();
    }

    setTempImageURL("");
  };
  

  const sellingPriceCalculator = () => {
    const price = productData.price;
    const discount = productData.discount;
    const x = price - (price * discount) / 100;
    setProductData({ ...productData, sellingPrice: x });
  };

  return (
    <Box className="p-4">
      <Typography variant="h4" className="mb-4">
        Create Product
      </Typography>
      <form onSubmit={handleUploadImage} className="space-y-4">
        <div className="mb-6 flex flex-row px-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600"
          >
            Image{" "}
          </label>
          <input
            type="file"
            accept="image/*"
            className="px-2 text-black"
            onChange={handleImageChange}
            required
          />
          {tempImageUrl !== "" && (
            <Image
              src={tempImageUrl}
              width={500}
              height={500}
              alt="Grow Food"
            />
          )}
        </div>
        <TextField
          label="Product Name"
          name="name"
          variant="outlined"
          fullWidth
          value={productData.name}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={productData.description}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Brand"
          name="brand"
          variant="outlined"
          fullWidth
          value={productData.brand}
          onChange={handleBrandChange}
          className="mb-4"
          select
        >
          {filteredBrands.map((brand) => (
            <MenuItem key={brand._id || brand.name} value={brand.name}>
              {brand.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Category"
          name="categories"
          variant="outlined"
          fullWidth
          value={productData.categories}
          onChange={handleCategoryChange}
          className="mb-4"
          select
        >
          {filteredCategories.map((category) => (
            <MenuItem key={category._id || category.name} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Sub-Category"
          name="subCategory"
          variant="outlined"
          fullWidth
          value={productData.subCategory}
          onChange={handleChange}
          className="mb-4"
        />
        {/* <TextField
          label="Image URL"
          name="image"
          variant="outlined"
          fullWidth
          value={productData.image}
          onChange={handleChange}
          className="mb-4"
        /> */}
        <TextField
          label="Discount"
          name="discount"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.discount}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Price"
          name="price"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.price}
          onChange={handleChange}
          className="mb-4"
          onBlurCapture={sellingPriceCalculator}
        />
        <TextField
          label="Selling Price"
          name="sellingPrice"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.sellingPrice}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Product Unit"
          name="unit"
          variant="outlined"
          fullWidth
          value={productData.unit}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Product Quantity"
          name="productQty"
          variant="outlined"
          fullWidth
          value={productData.productQty}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Minimum Order Quantity"
          name="minimumOrderQty"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.minimumOrderQty}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Packet Quantity"
          name="incDecBy"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.incDecBy}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Available Quantity"
          name="availableQty"
          variant="outlined"
          fullWidth
          type="number"
          value={productData.availableQty}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Food Preference"
          name="foodPrefence"
          variant="outlined"
          fullWidth
          value={productData.foodPrefence}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          label="Shelf Life"
          name="life"
          variant="outlined"
          fullWidth
          value={productData.life}
          onChange={handleChange}
          className="mb-4"
        />
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => setCreateMode(false)}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="success">
            Create Product
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default CreateProduct;
