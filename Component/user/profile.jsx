import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/userContext";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { createAddress } from "@/Api";
import Swal from "sweetalert2";
import { getuserAddress } from "@/Api";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Dialog,
  Drawer,
  textFieldClasses,
} from "@mui/material";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import { updateUserDetails } from "@/Api";
import deleteImageFromCloudinary from "@/Context/functions";
import { uploadImageToCloudinary } from "@/Context/functions";

const defaultformData = {
  name: "",
  mobile: "",
  locality: "",
  city: "",
  state: "",
  zip: "",
  landmark: "",
};

const Profile = () => {
  const { user } = useContext(UserContext);
  const defaultProfileForm = {
    image: user.user.image,
    tempImageUrl: user.user.image,
    shopName: user.user.shopName,
    name: user.user.name,
    mobile: user.user.mobile,
  };
  const [imageId, setImageId] = useState("");
  const [address, setAddress] = useState([]);
  const [addressmode, setAddressMode] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [image, setImage] = useState("");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [profileForm, setProfileForm] = useState(defaultProfileForm);
  const [formData, setFormData] = useState(defaultformData);

  useEffect(() => {
    getAddress(user.user._id);
  }, [user, user.user._id]);

  const handleChange = (e) => {
    if (formData.userId === "") {
      setFormData({
        ...formData,
        userId: user.user._id,
      });
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileChange = (e) => {
    if (profileForm.userId === "") {
      setProfileForm({
        ...profileForm,
        userId: user.user._id,
      });
    }
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleAddAddress = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${createAddress}`, { address: formData });
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Address successfully added",
          icon: "success",
        });
        getAddress(user.user._id);
        setAddressMode(false);
      }
    } catch (e) {
      console.error(e);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: e.message,
      });
    }
  };

  const getAddress = async () => {
    try {
      const res = await axios.get(`${getuserAddress}/${user.user._id}`);
      if (res.status === 200) {
        console.log("Success", res.data);
        localStorage.setItem("userAddress", JSON.stringify(res.data));
        setAddress(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadImage = async () => {
    if (image === "") {
      handleUpdateProfile();
    } else {
      try {
        const data = await uploadImageToCloudinary(image);
        console.log("data:", data);
        console.log(data.response);
        if (data.response) {
          console.log("setting");
          setProfileForm({
            ...profileForm,
            image: data.data.secure_url,
          });

          setImageId(data.data.public_id);
          console.log("image is ", imageId);
          setTempImageUrl("");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (imageId !== "") {
      handleUpdateProfile();
    }
  }, [imageId]);

  const handleImageChange = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage) {
      const tempUrl = URL.createObjectURL(selectImage);
      setTempImageUrl(tempUrl);
      setImage(selectImage);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`${updateUserDetails}/${user.user._id}`, {
        formData: profileForm,
      });
      if (res.status === 200) {
        Swal.fire({
          title: "Success ",
          icon: "success",
          text: "Profile updated successfully... request you to Relogin for get updated profile",
        });
      }
      setEditProfile(false);
    } catch (err) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: err.message,
      });
      console.error(err);
      deleteImageFromCloudinary(imageId);
    }
  };

  return (
    <>
      {addressmode ? (
        <>
          <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom className="mt-4">
              Create Address
            </Typography>
            <form onSubmit={handleAddAddress}>
              <Grid container spacing={2} className="grid grid-cols-2">
                <Grid item xs={12}>
                  <TextField
                    label="User ID"
                    name="userId"
                    value={user.user._id}
                    type="password"
                    disabled
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onMouseLeave={() => {
                      setFormData({
                        ...formData,
                        userId: user.user._id,
                      });
                    }}
                    onBlur={() => {
                      setFormData({
                        ...formData,
                        userId: user.user._id,
                      });
                    }}
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Locality"
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="ZIP"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                className="flex justify-between items-center mt-8 fl"
              >
                <Button onClick={() => setAddressMode(false)}>Close</Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </form>
          </Container>
        </>
      ) : (
        <div className="bg-gray-100">
          <div>
            <div className="flex ml-4 justify-center items-center">
              <img
                src={
                  user?.user?.image !== undefined
                    ? user.user.image
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                width={150}
                height={150}
                className="rounded-full mx-8 border-2 border-green-600 shadow-md shadow-green-600 mt-1"
              />
              <FaEdit
                className="text-green-600 hover:cursor-pointer text-xl"
                onClick={() => {
                  setEditProfile(true);
                  setProfileForm({
                    ...profileForm,
                    userId: user.user._id,
                    shopName: user.user.shopName,
                    name: user.user.name,
                    mobile: user.user.mobile,
                  });
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-4 gap-2 ">
              <span className="font-semibold text-xl px-4 py-1 bg-green-600 rounded-lg text-white">
                {user.user.name}
              </span>
              <span className="text-sm bg-blue-100 px-2 py-1">
                {user.user.email}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4 px-4 bg-green-600">
                <Link href="/Orders" className="font font-semibold text-white">
                  Orders : {user?.orderLength ?? 0}{" "}
                </Link>
                <FaEye
                  className=" react-icons text-lg"
                  onClick={() => setAddressMode(!addressmode)}
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-4 bg-green-600">
                <Link href="/cart" className="font font-semibold text-white">
                  Cart : {user.cartLength}
                </Link>
                <FaEye
                  className=" react-icons text-lg"
                  onClick={() => setAddressMode(!addressmode)}
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-4 bg-green-600">
                <span className="font font-semibold text-white">
                  Address : {address.length}{" "}
                </span>
                <FaPlus
                  className=" react-icons text-lg"
                  onClick={() => setAddressMode(!addressmode)}
                />
              </div>
            </div>
            <div>
              {address.map((item, index) => (
                <div className="flex flex-col bg-gray-100 text-sm shadow-md shadow-green-600 mt-2 px-4">
                  <span>Name : {item.name}</span>
                  <span>Mobile : {item.mobile}</span>
                  <div className="flex flex-wrap gap-2 flex-row mt-1 text-sm text-gray-700">
                    <span>{item.landmark}</span>
                    <span>{item.locality}</span>
                    <span>{item.city}</span>
                    <span>{item.state}</span>
                    <span>{item.zip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <Drawer
        open={editProfile}
        anchor="left"
        onClose={() => setEditProfile(false)}
      >
        <div className="w-auto h-full bg-gray-100">
        <div className="bg-color-1 flex justify-center items-center">
          <span className="text-xl font-semibold">Edit Profile</span>
        </div>
        <div className="pt-4 bg-gray-100">
          <div className="mb-6 flex flex-col mt-4 px-2  justify-between">
            {tempImageUrl !== "" && (
              <Image
                src={tempImageUrl}
                width={100}
                height={100}
                className=" w-36 h-36 mt-2 self-center rounded-full"
                alt="Grow Food"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="px-2 text-black mt-4"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>
        <div className="flex gap-4 bg-gray-100 flex-col mx-4">
          <TextField
            label="Shop Name"
            name="shopName"
            variant="outlined"
            fullWidth
            value={profileForm.shopName ?? ""}
            onChange={handleProfileChange}
            className=" mx-4 my-2"
            size="small"
          />
          <TextField
            label="Contact Person Name"
            name="name"
            variant="outlined"
            fullWidth
            value={profileForm.name ?? ""}
            onChange={handleProfileChange}
            className="w-auto mx-4 my-2"
            size="small"
          />
          <TextField
            label="Mobile"
            name="mobile"
            variant="outlined"
            fullWidth
            value={profileForm.mobile ?? ""}
            onChange={handleProfileChange}
            className="w-auto mx-4 my-2 mt-2"
            size="small"
          />
        </div>
        <div className="flex justify-between px-4 items-center mt-4">
        <Button variant="contained" color="inherit" onClick={()=>setEditProfile(false)}>
            Close
          </Button> 
          
          <Button
            onClick={() => handleUploadImage()}
            variant="contained"
            className="bg-color-1"
            color="success"
            
          >
            Update
          </Button>
          
        </div>
        </div>
      </Drawer>
    </>
  );
};

export default Profile;
