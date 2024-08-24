import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Authform from "../Component/user/authform";
import { userlogin } from "@/Api";
import { logout, fetchUserDetails } from "@/Redux/actions/userAuthAction";
import Swal from "sweetalert2";
import axios from "axios";
import UserContext from "@/userContext";
import { logo_uri } from "@/Api";
const AuthComponent = () => {
  const [authType, setAuthType] = useState("SignIn"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const {user, setUser} = useContext(UserContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const router = useRouter();

  const handleAuthSwitch = () => {
    setAuthType(authType == "SignIn" ? "SignUp" : "SignIn");
  };


  

  const handleSubmit = async(event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
      ...(authType === "SignUp" && {
        name,
        mobile,
        shopName,
      }),
    };

    if (authType === "SignIn") {
      try {
        const response = await axios.post(`${userlogin}`, { email, password });
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        Swal.fire({
          title : 'success',
          icon : 'success',
          text : 'Log in Successfully',
        })
        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        Swal.fire({
          title : 'error',
          icon : 'error',
          text : error.message,
        });
      }
      
    } else {
      try {
       const res = await axios.post(`${API_URL}/register`, userData);
        if(res.status===200){
          Swal.fire({
            title : 'Success',
            icon : 'success',
            text : "Thanks for joining Grow Food"
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        Swal.fire({
          title : 'Failure',
          icon : 'error',
          text : error.message
        });
      }
    }
  };  

  return (
    <div className="mt-8">
      <div className="flex flex-col justify-center items-center">
      <img
        src={logo_uri}
        alt="Grow Food"
        className=" w-32 border-pink-400 shadow-black shadow-lg border-2 rounded-full p-4"
      />
      <h2 className="text-2xl font-semibold text-white bg-pink-600 text-center mt-4 my-2 px-4 py-1 rounded-md">
        {authType == "SignIn" ? "Sign In" : "Create Account"}
      </h2>
      </div>
      
      <Authform
        authType={authType}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        mobile={mobile}
        setMobile={setMobile}
       
        handleAuthSwitch={handleAuthSwitch}
        handleSubmit={handleSubmit}
        shopName={shopName}
        setShopName={setShopName}
      />
      {user?.user && (
        <div className="mt-8 text-white">
          <h3>User Details:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
          {/* <p>Address: {user.address.address}, {user.address.city}, {user.address.state} - {user.address.zip}</p> */}
          <button onClick={() => dispatch(logout())}>Sign Out</button>
        </div>
      )}
      {/* <Dialog open={open}>
          <Notifier 
          open={open!==""}
          setOpen={setOpen}  
          message={message}
          />

      </Dialog> */}
    </div>
  );
};

export default AuthComponent;
