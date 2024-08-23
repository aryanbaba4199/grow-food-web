import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Loader from "../../helpers/loader";
import { API_URL } from "@/Api";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/Redux/actions/productActions";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconURL, setIconURL] = useState("");
  const [loader, setLoader] = useState(false);
  const [tempIconURL, setTempIconURL] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.products.categories);

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
    e.preventDefault();
    setLoader(true);

    try {
      const uploadedUrl = await handleImageUpload();
      const res = await axios.post(`${API_URL}/products/createCategory`, {
        name: categoryName,
        icon: uploadedUrl,
      });

      if (res.status === 200) {
        alert("Category created successfully");
        setCategoryName("");
        setIcon(null);
        setIconURL("");
        setTempIconURL("");
        dispatch(getCategories()); // Refresh the categories list
      } else {
        alert("Failed to create category");
      }
      setLoader(false);
    } catch (err) {
      console.error("Error creating category", err);
      alert("Failed to create category");
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

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setIconURL(category.icon);
    setTempIconURL(category.icon);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      setLoader(true);
      try {
        const res = await axios.delete(
          `${API_URL}/products/deleteCategory/${selectedCategory._id}`
        );
        if (res.status === 200) {
          alert("Category deleted successfully");
          setSelectedCategory(null);
          setOpen(false);
          dispatch(getCategories()); 
        } else {
          alert("Failed to delete category");
        }
        setLoader(false);
      } catch (err) {
        console.error("Error deleting category", err);
        alert("Failed to delete category");
        setLoader(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCreating(false);
    setEditMode(false);
    setCategoryName("");
    setIcon(null);
    setIconURL("");
    setTempIconURL("");
  };

  const handleUpdate = async() => {
    handleImageUpload();
    try{
      const res = await axios.put(`${API_URL}/products/updateCategory/${selectedCategory._id}0`, {name: categoryName,
        icon: uploadedUrl,})
      if(res.status===200){
        alert("Category updated successfully")
      }else{
        alert("Category not updated")
      }
    }catch(err){
      console.log(err)
      alert("Error updating category")
    }
  };

  return (
    <div>
      <div className="px-8">
        <div className="font-semibold text-lg flex justify-center items-center mt-8">
          <p>Categories</p>
        </div>
        <div className="grid md:grid-cols-6 items-center mt-8 gap-2">
          {categories.map((item, index) => (
            <div
              key={index}
              className="w-44 h-28 py-2 border shadow-md shadow-black flex flex-col justify-center items-center cursor-pointer"
              onClick={() => handleEdit(item)}
            >
              <img
                src={
                  item?.icon ||
                  "https://media.designrush.com/inspiration_images/134802/conversions/_1511456315_653_apple-desktop.jpg"
                }
                className="w-24 h-24"
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreating(true)}
        >
          Create Category
        </Button>
      </div>

      <Dialog open={creating || editMode} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit Category" : "Create Category"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col space-y-12">
            <TextField
              style={{marginTop : 8}}
              label="Category Name"
              variant="outlined"
              className=""
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <input type="file" onChange={handleImageChange} />
            {tempIconURL && (
              <div className="flex justify-center items-center mt-4">
                <img
                  src={tempIconURL}
                  alt="Category Icon"
                  className="w-20 h-20"
                />
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
              <Button onClick={handleUpdate} color="info">
              Update
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
            </>
            
          ) : (
            <Button onClick={handleSubmit} color="primary">
              Create
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {loader && <Loader />}
    </div>
  );
};

export default CreateCategory;
