import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Authform from "../Component/user/authform";
import { useDispatch, useSelector } from "react-redux";
import { login, register, logout, fetchUserDetails } from "@/Redux/actions/userAuthAction";
import { Dialog } from "@mui/material";
import Notifier from "../Component/helpers/popup";



const AuthComponent = () => {
  const [authType, setAuthType] = useState("SignIn"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  
  const [open, setOpen] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state?.auth);

  const router = useRouter();

  const handleAuthSwitch = () => {
    setAuthType(authType === "SignIn" ? "SignUp" : "SignIn");
  };

  const handleSubmit = (event) => {
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
      dispatch(login(email, password));
      
    } else {
      dispatch(register(userData));
      <Notifier open={open}
        setOpen={setOpen}
        message={"Register successfully..."}
      />
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserDetails());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        {authType === "SignIn" ? "Sign In" : "Create Account"}
      </h2>
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
      {isAuthenticated && user && (
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
