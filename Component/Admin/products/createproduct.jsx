import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  createSubCategory,
  createUnit,
  getSubCategoriesApi,
} from "@/Api";
import axios from "axios";
import { FaPercent } from "react-icons/fa";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {
  getBrands,
  getCategories,
  getSubCategories,
  getUnit,
} from "@/Redux/actions/productActions"; // Adjust the import path as needed
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Autocomplete, Box, Typography, Grid, IconButton } from "@mui/material";
import Image from "next/image";
import Swal from "sweetalert2";
import { unitMeasureData } from "@/Context/projectData";
import deleteImageFromCloudinary, {
  uploadImageToCloudinary,
} from "@/Context/functions";
import { MdCameraFront } from "react-icons/md";




const CreateProduct = ({ setIndex, setCreateMode }) => {
  const defaultFormData = {
    name: "",
    description: "",
    brand: "",
    categories: "",
    subCategory: "",
    image: [],
    discount: 0,
    discountType: "",
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
  const unitsData = useSelector((state) => state.products.units);
  const subCategoryData = useSelector((state) => state.products.subCategories);
  const [image, setImage] = useState("");
  const [units, setUnits] = useState(["Create Unit"]);
  const [subCategory, setSubCategory] = useState(["Create Sub Category"]);
  const [imageId, setImageId] = useState([]);
  const [tempImageUrl, setTempImageURL] = useState("");
  const [productData, setProductData] = useState(defaultFormData);
  const [errorField, setErrorField] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [discountType, setDiscountType] = useState(0);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getUnit());
    dispatch(getSubCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBrands(brands);
  }, [brands]);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    const unitNames = unitsData.map((unit) => unit.name);
    setUnits([...unitNames, "Create Unit"]);
   
  }, [unitsData]);

console.log(productData)
  useEffect(() => {
    if (subCategoryData !== undefined) {
      const subCategoryName = subCategoryData?.map((item) => item.name);
      console.log(subCategoryName);
      setSubCategory([...subCategoryName, "Create Sub Category"]);
    }
  }, [subCategoryData]);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // useEffect(()=>{
  //   if(imageId!=='' && errorField.length===0){
  //     handleSubmit();
  //   }
  // }, [imageId, errorField.length])

  const handleSubmit = async () => {
    try {
      const response = await axios.post(createProduct, productData, {});
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Product Created successfully",
          icon: "success",
        });
        
      }
    } catch (e) {
      imageId.map(async(item)=> await deleteImageFromCloudinary(item))
      console.log("Failed to upload");
      Swal.fire({
        title: "Error",
        text: e.message,
        icon: "error",
      });
    }
  };

  const onEnterFocudNext = (e, id) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();

      document.getElementById(id)?.focus();
    }
  };

  

  const validateFormData = () => {
    const errors = [];

    for (let field in productData) {
      if (productData[field] === defaultFormData[field]) {
        console.log(field);

        errors.push(field);
      }
    }
    console.log(errors);

    setErrorField(errors);
    console.log(errorField.length);
    if (errors.length === 0) {
      handleSubmit();
    } else {
      Swal.fire({
        icon: "warning",
        title: "Required fields are blank",
      });
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files); // Convert FileList to Array
    const newImageUrls = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setTempImageURL((prevUrls) => [...prevUrls, ...newImageUrls]); // Append new images
    setImage((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleUploadImage = async () => {
    if (image.length === 0) {
      Swal.fire({
        title: "Please Select Images",
        icon: "warning",
      });
      return;
    }
  
    try {
      const uploadedImages = await Promise.all(
        image.map((image) => uploadImageToCloudinary(image))
      );
  
      const successfulUploads = uploadedImages.filter(
        (imageData) => imageData.response === true
      );
  
      if (successfulUploads.length === image.length) {
        setProductData({
          ...productData,
          image: successfulUploads.map((imageData) => imageData.data.url),
        });
        validateFormData();
        
      } else {
        Swal.fire({
          title: "Image Upload Error",
          icon: "error",
          text: "Some images failed to upload. Please try again.",
        });
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        title: "Error uploading images",
        icon: "error",
        text: "An error occurred while uploading images.",
      });
    }
  };
  
  // Remove useEffect since it's no longer needed
  console.log(image.length===tempImageUrl.length)

  const sellingPriceCalculator = () => {
    
    const price = productData.price;
    const discount = productData.discount;
    if (discountType == "0") {
      const x = price - (price * discount) / 100;
      setProductData({ ...productData, sellingPrice: x });
    } else if (discountType == "1") {
      const x = price - discount;
      setProductData({ ...productData, sellingPrice: x });
    }
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
      <div className="space-y-4">
        <div className="mb-6 flex flex-row px-2  justify-between">
          <input
            type="file"
            accept="image/*"
            multiple
            id="image-upload"
            className="px-2 text-black"
            onChange={handleImageChange}
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<MdCameraFront />}
            color="primary"
          >
            Upload Images
          </Button>
        </label>
        

          {tempImageUrl !== "" && 
            <>
            {tempImageUrl.map((item, index)=>(
              <Image
              src={item}
              width={200}
              height={200}
              className="rounded-md w-36 h-36"
              alt="Grow Food"
            />
            ))}
            
            </>
          }
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
            onKeyDownCapture={(e) => onEnterFocudNext(e, "brand")}
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
            id="brand"
            
            options={filteredBrands.map((brand) => brand.name)} // List of brands
            renderInput={(params) => (
              <TextField
                {...params}
                label="Brand"
                onKeyDownCapture={(e) => onEnterFocudNext(e, "category")}
                name="brand"
                
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
            
          />

          <Autocomplete
            options={filteredCategories.map((item) => item.name)}
            id="category"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                name="categories"
                variant="outlined"
                fullWidth
                onKeyDownCapture={(e) => onEnterFocudNext(e, "subCategory")}
                className="mb-4"
                error={errorField.includes("categories")} // Check if 'name' is in errorField
                helperText={
                  errorField.includes("categories")
                    ? "Category is required"
                    : ""
                }
              />
            )}
            onInputChange={(event, value) => {
              setProductData({ ...productData, categories: value });
            }}
            value={productData.categories}
     
          ></Autocomplete>

          <Autocomplete
            options={subCategory}
            id="subCategory"
            value={productData.subCategory}
            renderInput={(params) => (
              <TextField
                {...params}
                error={errorField.includes("subCategory")}
                helperText={
                  errorField.includes("subCategory")
                    ? "Sub Category is required"
                    : ""
                }
                label="Sub Category"
                name="subCategory"
                fullWidth
                
                className="mb-4"
                onKeyDownCapture={(e) => onEnterFocudNext(e, "type")}
              />
            )}
            onInputChange={(e, value) => {
              if (value == "Create Sub Category") {
                Swal.fire({
                  title: "Create Sub Category",
                  icon: "info",
                  input: "text",
                  inputAutoFocus: true,
                  inputLabel: "Enter Sub Category Name",
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "Create",
                  inputValidator: (inputValue) => {
                    if (!inputValue) {
                      return "Please enter a valid sub category name";
                    }
                    return null;
                  },
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const formData = { name: result.value };
                    try {
                      const res = await axios.post(createSubCategory, {
                        formData,
                      });
                      if (res.status === 200) {
                        Swal.fire({
                          title: "Success",
                          icon: "success",
                          text: "Sub Category created successfully...",
                        });
                        dispatch(getSubCategories());
                      }
                    } catch (err) {
                      console.log(err);
                      Swal.fire(err.message);
                    }
                  }
                });
              } else {
                setProductData({
                  ...productData,
                  subCategory: value,
                });
              }
            }}
          />

          <Grid container spacing={2} alignItems="center" className="mb-4">
            {/* Dropdown for selecting discount type */}
            <Grid item xs={3}>
              <TextField
                select
                label="Type"
                id="type"
                value={discountType}
                onChange={(e) => {setDiscountType(e.target.value)
                  setProductData({...productData, discountType : discountType!=="1" ? "Rupees" : "Percentage"})
                }}
                variant="outlined"
                fullWidth
                onKeyDownCapture={(e) => onEnterFocudNext(e, "discount")}
              >
                <MenuItem value="0"><FaPercent/></MenuItem>
                <MenuItem value="1"><MdOutlineCurrencyRupee className="text-lg"/></MenuItem>
              </TextField>
            </Grid>

            {/* Input for discount value */}
            <Grid item xs={9}>
              <TextField
                label={`Discount in ${discountType=="1" ? "Rupees" : "Percentage"}`}
                name="discount"
                variant="outlined"
                fullWidth
                id="discount"
                type="number"
                error={errorField.includes("discount")}
                helperText={
                  errorField.includes("discount") ? "discount is required" : ""
                }
                value={productData.discount === 0 ? "" : productData.discount}
                onChange={handleChange}
                onKeyDownCapture={(e) => onEnterFocudNext(e, "price")}
                onBlurCapture={sellingPriceCalculator}
              />
            </Grid>
          </Grid>

          <TextField
            error={errorField.includes("price")}
            helperText={errorField.includes("price") ? "price is required" : ""}
            label="Price"
            name="price"
            id="price"
            variant="outlined"
            fullWidth
            type="number"
            value={productData.price === 0 ? "" : productData.price}
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "unit")}
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
            value={
              productData.sellingPrice == 0 ? "" : productData.sellingPrice
            }
            onChange={handleChange}
            disabled
            className="mb-4"
          />
          <Autocomplete
            options={units}
            id="unit"
            renderInput={(params) => (
              <TextField
                {...params}
                error={errorField.includes("unit")}
                helperText={
                  errorField.includes("unit") ? "Unit is required" : ""
                }
                label="Product Unit"
                name="unit"
                variant="outlined"
                fullWidth
                className="mb-4"
                onKeyDownCapture={(e) => onEnterFocudNext(e, "prqty")}
              />
            )}
            onInputChange={(e, value) => {
              if (value == "Create Unit") {
                Swal.fire({
                  title: "Create",
                  icon: "info",
                  input: "text",
                  inputAutoFocus: true,
                  inputLabel: "Enter unit Name",
                  showCancelButton: true,
                  showConfirmButton: true,
                  confirmButtonText: "Submit",
                  inputValidator: (inputValue) => {
                    if (!inputValue) {
                      return "Please enter a unit name!";
                    }
                    return null; // Return null if the input is valid
                  },
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const res = await axios.post(createUnit, {
                        formData: result.value,
                      });
                      if (res.status === 200) {
                        Swal.fire({
                          title: "success",
                          icon: "success",
                          text: "Unit Created Successfully",
                        });
                        dispatch(getUnit());
                      }
                    } catch (err) {
                      console.error(err);
                      Swal.fire(err.message);
                    }
                  }
                });
              } else {
                setProductData({ ...productData, unit: value });
              }
            }}
            onSelect={(event) => {
              if (event.target.value === "Create Unit") {
                console.log("Ji", event.target.value);
              }
            }}
            value={productData.unit}
            
          ></Autocomplete>

          <TextField
            id="prqty"
            label={`Product Quantity (${productData.unit})`}
            error={errorField.includes("productQty")}
            helperText={
              errorField.includes("productQty")
                ? "Product quantity is required"
                : ""
            }
            name="productQty"
            variant="outlined"
            fullWidth
            value={productData.productQty === 0 ? "" : productData.productQty}
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "moq")}
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
            id="moq"
            type="number"
            value={
              productData.minimumOrderQty === 0
                ? ""
                : productData.minimumOrderQty
            }
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "incdec")}
          />
          <TextField
            id="incdec"
            label="Increase / Decrease by"
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
            value={productData.incDecBy === 0 ? "" : productData.incDecBy}
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "aq")}
          />
          <TextField
            id="aq"
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
            value={
              productData.availableQty === 0 ? "" : productData.availableQty
            }
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "foodpref")}
          />
          <TextField
            id="foodpref"
            label="Food Preference"
            name="foodPrefence"
            variant="outlined"
            fullWidth
            value={productData.foodPrefence}
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "life")}
          />
          <TextField
            id="life"
            label="Shelf Life"
            name="life"
            variant="outlined"
            fullWidth
            value={productData.life}
            onChange={handleChange}
            className="mb-4"
            onKeyDownCapture={(e) => onEnterFocudNext(e, "submit")}
          />
        </div>
        <div className="flex justify-between gap-2">
          <Button
            onClick={() => {
              setIndex ? setIndex("") : setCreateMode(false);
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <div className="flex gap-4">
          <Button
          variant="contained"
          color="info"
          onClick={()=>{
            setProductData({defaultFormData})
          }}
          >
            Reset
          </Button>
          <Button
            
            onClick={handleUploadImage}
            variant="contained"
            color="success"
            id="submit"
          >
            {image.length===tempImageUrl.length ? 
            <span onClick={handleSubmit}>Create Product</span> :
            <span onClick={handleUploadImage}>Upload Images</span>
} 
          </Button>
          
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CreateProduct;
