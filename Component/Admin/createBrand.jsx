import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Loader from "../helpers/loader";
import { API_URL } from "@/Api";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "@/Redux/actions/productActions";


const CreateBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconURL, setIconURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [tempIconURL, setTempIconURL] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(()=>{
    if(iconURL!==""){
      handleSubmit();
    }
  }, [iconURL]);

  const brands = useSelector((state) => state.products.brands);

  const handleImageUpload = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", icon);
    formData.append("upload_preset", "ml_default");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      if (res.data.url) {
        setIconURL(res.data.url);
        console.log("Image uploaded successfully. URL:", res.data.url);
      }
      setLoader(false);
      return res.data.url;
    } catch (err) {
      console.error("Error uploading image", err);
      alert("Failed to upload image");
      setLoader(false);
    }
  };

  const handleSubmit = async (e) => {

    setLoader(true);

    try {
    
      const res = await axios.post(`${API_URL}/api/products/createBrand`, {
        name: brandName,
        icon: iconURL,
      });

      if (res.status === 200) {
        alert("Brand created successfully");
        setBrandName("");
        setIcon(null);
        setIconURL("");
        setTempIconURL("");
        dispatch(getBrands()); // Refresh the brands list
      } else {
        alert("Failed to create brand");
      }
      setLoader(false);
    } catch (err) {
      console.error("Error creating brand", err);
      alert("Failed to create brand");
      setLoader(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedIcon = e.target.files[0];
    if (selectedIcon) {
      const tempIconUrl = URL.createObjectURL(selectedIcon);
      setTempIconURL(tempIconUrl);
      setIcon(selectedIcon);
    }
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setBrandName(brand.name);
    setIconURL(brand.icon);
    setTempIconURL(brand.icon);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (selectedBrand) {
      setLoader(true);
      try {
        const res = await axios.delete(`${API_URL}/products/deleteBrand/${selectedBrand._id}`);
        if (res.status === 200) {
          alert("Brand deleted successfully");
          setSelectedBrand(null);
          setOpen(false);
          dispatch(getBrands()); 
        } else {
          alert("Failed to delete brand");
        }
        setLoader(false);
      } catch (err) {
        console.error("Error deleting brand", err);
        alert("Failed to delete brand");
        setLoader(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCreating(false);
    setEditMode(false);
    setBrandName("");
    setIcon(null);
    setIconURL("");
    setTempIconURL("");
  };

  const handleUpdate = async() => {
    try{
      const res = await axios.put(`${API_URL}/products/updateBrand/${selectedBrand._id}`)
      if(res.status===200){
        alert("Update Brands successfully updated");
      }else{
        alert("Brand Not Found");
      }
    }catch(err){
      console.log(err);
      alert("Bad Response");
    }
  };

  return (
    <div>
      <div className="px-8">
      <Typography variant="h4" className="mb-4 flex justify-center items-center ">
        <span className="bg-[#1e4426] rounded-s-md px-4 text-white">Brands</span>
      </Typography>
        <div className="grid md:grid-cols-6 items-center mt-8 gap-2">
          {brands.map((item, index) => (
            <div
              key={index}
              className=" h-28 border shadow-md shadow-black flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleEdit(item)}
            >
              <img
                src={
                  item?.icon ||
                  "https://media.designrush.com/inspiration_images/134802/conversions/_1511456315_653_apple-desktop.jpg"
                }
                className="w-24 h-20 rounded-lg"

              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <Button variant="contained" color="primary" onClick={() => setCreating(true)}>
          Create Brand
        </Button>
      </div>

      <Dialog open={creating || editMode} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Brand" : "Create Brand"}</DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-4">
            <TextField
            style={{marginTop : 8}}
              label="Brand Name"
              variant="outlined"
              fullWidth
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
            <input type="file" onChange={handleImageChange} />
            {tempIconURL && (
              <div className="flex justify-center items-center mt-4">
                <img src={tempIconURL} alt="Brand Icon" className="w-20 h-20" />
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          {editMode ? (
            <>
            <Button onClick={()=>handleUpdate(selectedBrand._id)} color="error">
              Update
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
            </>
            
          ) : (
            <Button onClick={handleImageUpload} color="primary">
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {loader && <Loader />}
    </div>
  );
};

export default CreateBrand;
