import React, { useContext, useEffect, useState } from "react";
import UserContext from "@/userContext";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { createAddress } from "@/Api";
import Swal from "sweetalert2";
import { getuserAddress } from "@/Api";
import { TextField, Button, Grid, Container, Typography } from '@mui/material';
import Link from "next/link";
import { FaEye } from "react-icons/fa";



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
  const [address, setAddress] = useState([]);
  const [addressmode, setAddressMode] = useState(false);
  const [formData, setFormData] = useState( defaultformData );

  useEffect(() => {
    
    getAddress(user.user._id);
  }, [user, user.user._id]);

  const handleChange = (e) => {
    if(formData.userId===''){
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

  const handleAddAddress = async (event) => {
    event.preventDefault();
   
  
    try {
      const res = await axios.post(`${createAddress}`, {address : formData});
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
        localStorage.setItem('userAddress', JSON.stringify(res.data))
        setAddress(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };



  console.table(user);

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
        onMouseLeave={()=>{
          setFormData({
            ...formData,
            userId: user.user._id
          })
        }}
        onBlur={()=>{
          setFormData({
            ...formData,
            userId: user.user._id
          })
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
  <Grid item xs={12} className="flex justify-between items-center mt-8 fl">
    <Button onClick={()=>setAddressMode(false)}>Close</Button>
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
            <div className="flex justify-center items-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              width={150}
              height={150}
              className="rounded-full mx-8 border-2 border-green-600 shadow-md shadow-green-600 mt-1"
              onClick={()=>getAddress(user.user._id)}
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
              <Link href="/Orders" className="font font-semibold text-white">Orders : {user?.orderLength ??0} </Link>
              <FaEye
                className=" react-icons text-lg"
                onClick={()=>setAddressMode(!addressmode)}
              />
              </div>
              <div className="flex justify-between items-center mt-4 px-4 bg-green-600">
              <Link href="/cart" className="font font-semibold text-white">Cart : {user.cartLength}</Link>
              <FaEye
                className=" react-icons text-lg"
                onClick={()=>setAddressMode(!addressmode)}
              />
              </div>
              <div className="flex justify-between items-center mt-4 px-4 bg-green-600">
              <span className="font font-semibold text-white">Address : {address.length} </span>
              <FaPlus
                className=" react-icons text-lg"
                onClick={()=>setAddressMode(!addressmode)}
              />
              </div>
            </div>
            <div>
              {address.map((item, index)=>(
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
    </>
  );
};

export default Profile;
