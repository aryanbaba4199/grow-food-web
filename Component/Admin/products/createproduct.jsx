import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, createUnit } from "@/Api";
import axios from "axios";

import { getBrands, getCategories, getUnit } from "@/Redux/actions/productActions"; // Adjust the import path as needed
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Box, Typography } from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";
import { unitMeasureData } from "@/Context/projectData";

const CreateProduct = ({ setIndex }) => {
  const defaultFormData = {
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
  };

  const dispatch = useDispatch();
  const brands = useSelector((state) => state.products.brands);
  const categories = useSelector((state) => state.products.categories);
  const unitsData = useSelector((state) => state.products.units)
  const [image, setImage] = useState("");
  const [units, setUnits] = useState(["Create Unit"])
  const [imageId, setImageId] = useState("");
  const [tempImageUrl, setTempImageURL] = useState("");
  const [productData, setProductData] = useState(defaultFormData);
  const [errorField, setErrorField] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  


  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getUnit());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBrands(brands);
  }, [brands]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(()=>{
    const unitNames = unitsData.map(unit => unit.name);
    setUnits([...unitNames, "Create Unit"]);
     console.log(units);
  }, [unitsData])

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
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
          unit : "",
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

  const onEnterFocudNext = (e, id) => {
    if (e.key === "Enter" || e.key == "Tab") document.getElementById(id);
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

  const validateFormData = () => {
    const errors = [];

    for (let field in productData) {
      if (productData[field] === defaultFormData[field]) {
        errors.push(field);
      }
    }

    setErrorField(errors);
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    validateFormData();
    console.log(errorField.length);
    if (errorField.length > 0) {
      return;
    } else {
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
    }
  };

  const sellingPriceCalculator = () => {
    const price = productData.price;
    const discount = productData.discount;
    const x = price - (price * discount) / 100;
    setProductData({ ...productData, sellingPrice: x });
  };

  return (
    <Box className="p-4">
      <Typography
        variant="h4"
        className="mb-4 flex justify-center items-center "
      >
        <span className="bg-[#1e4426] rounded-s-md px-4 text-white">
          Create Product
        </span>
      </Typography>
      <form onSubmit={handleUploadImage} className="space-y-4">
        <div className="mb-6 flex flex-row px-2  justify-between">
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
              width={200}
              height={200}
              className="rounded-md w-36 h-36"
              alt="Grow Food"
            />
          )}
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 ">
          <TextField
            label="Product Name"
            name="name"
            variant="outlined"
            fullWidth
            value={productData.name}
            onChange={handleChange}
            className="mb-4"
            error={errorField.includes("name")} // Check if 'name' is in errorField
            helperText={errorField.includes("name") ? "Name is required" : ""} // Show an error message if in errorField
            onKeyDownCapture={(e) => onEnterFocudNext(e, "des")}
          />

          <TextField
            id="des"
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            value={productData.description}
            onChange={handleChange}
            error={errorField.includes("description")} // Check if 'name' is in errorField
            helperText={
              errorField.includes("description")
                ? "description is required"
                : ""
            }
            className="mb-4"
          />
          <Autocomplete
            options={filteredBrands.map((brand) => brand.name)} // List of brands
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                name="brand"
                variant="outlined"
                fullWidth
                className="mb-4"
                error={errorField.includes("brand")} // Check if 'brand' is in errorField
                helperText={
                  errorField.includes("brand") ? "Brand is required" : ""
                }
              />
            )}
            onInputChange={(event, newValue) => {
              setProductData({ ...productData, brand: newValue });
            }}
            value={productData.brand}
            freeSolo // Allow typing a custom value
          />

          <Autocomplete
            options={filteredCategories.map((item)=>item.name)}
            renderInput={(params)=>(
              <TextField
              {...params}
            label="Category"
            name="categories"
            variant="outlined"
            fullWidth
            
            className="mb-4"
            error={errorField.includes("categories")} // Check if 'name' is in errorField
            helperText={
              errorField.includes("categories") ? "Category is required" : ""
            }
            />
          
            )}
            onInputChange={(event, value)=>{
              setProductData({...productData, categories : value})
            }}
            value={productData.categories}
            freeSolo
          >


          </Autocomplete>

          
          <TextField
            label="Sub-Category"
            name="subCategory"
            variant="outlined"
            fullWidth
            error={errorField.includes("subCategory")}
            helperText={
              errorField.includes("subCategory")
                ? "subCategory is required"
                : ""
            }
            value={productData.subCategory}
            onChange={handleChange}
            className="mb-4"
          />
          
          <TextField
            label="Discount"
            name="discount"
            variant="outlined"
            fullWidth
            type="number"
            error={errorField.includes("discount")}
            helperText={
              errorField.includes("discount") ? "discount is required" : ""
            }
            value={productData.discount}
            onChange={handleChange}
            className="mb-4"
          />
          <TextField
            error={errorField.includes("price")}
            helperText={errorField.includes("price") ? "price is required" : ""}
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
            error={errorField.includes("sellingPrice")}
            helperText={
              errorField.includes("sellingPrice")
                ? "Selling Price is required"
                : ""
            }
            label="Selling Price"
            name="sellingPrice"
            variant="outlined"
            fullWidth
            type="number"
            value={productData.sellingPrice}
            onChange={handleChange}
            className="mb-4"
          />
          <Autocomplete
          options={units}
          renderInput={(params)=>(
            <TextField
            {...params}
            error={errorField.includes("unit")}
            helperText={errorField.includes("unit") ? "Unit is required" : ""}
            label="Product Unit"
            name="unit"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
          )}
          onInputChange={(e, value)=>{
            if(value=='Create Unit'){
              Swal.fire({
                title: 'Create',
                icon: 'info',
                input :'text',
                inputAutoFocus: true,
                inputLabel : "Enter unit Name",
                showCancelButton : true,
                showConfirmButton: true,
                confirmButtonText : 'Submit', 
                inputValidator: (inputValue) => {
                  if (!inputValue) {
                    return "Please enter a unit name!";
                  }
                  return null; // Return null if the input is valid
                },
              }).then(async(result)=>{
                if(result.isConfirmed){
                 
                    try{
                      const res = await axios.post(createUnit, {formData : result.value})
                      if(res.status===200){
                        Swal.fire({
                          title : 'success',
                          icon : 'success',
                          text : "Unit Created Successfully",
                        })
                        dispatch(getUnit())
                      }
                    }catch(err){
                      console.error(err);
                      Swal.fire(err.message);
                    }
                }
              })
            }else{
              setProductData({...productData, unit : value});
            }
            
            
          }}
          onSelect={(event)=>{
            if(event.target.value==='Create Unit'){
              console.log("Ji", event.target.value)
            }
          }}
          value={productData.unit}
          freeSolo
          >

          </Autocomplete>
          
          <TextField
            label="Product Quantity"
            error={errorField.includes("productQty")}
            helperText={
              errorField.includes("productQty")
                ? "Product quantity is required"
                : ""
            }
            name="productQty"
            variant="outlined"
            fullWidth
            value={productData.productQty}
            onChange={handleChange}
            className="mb-4"
          />
          <TextField
            error={errorField.includes("minimumOrderQty")}
            helperText={
              errorField.includes("minimumOrderQty")
                ? "Minimum Order quantity is required"
                : ""
            }
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
            error={errorField.includes("incDecBy")}
            helperText={
              errorField.includes("incDecBy")
                ? "Packet quantity is required"
                : ""
            }
            name="incDecBy"
            variant="outlined"
            fullWidth
            type="number"
            value={productData.incDecBy}
            onChange={handleChange}
            className="mb-4"
          />
          <TextField
            error={errorField.includes("availableQty")}
            helperText={
              errorField.includes("availableQty")
                ? "Available quantity is required"
                : ""
            }
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
        </div>
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => setIndex("")}
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
