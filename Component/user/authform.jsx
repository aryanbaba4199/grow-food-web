import React, { useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material";
import { getUserGeoLocation } from "@/Context/functions";


const Authform = ({
  authType,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  mobile,
  setMobile,

  handleAuthSwitch,
  handleSubmit,
  shopName,
  setShopName,
  shopAddress,
  setShopAddress,
  userType,
  setUserType,
  setGst,
  gst,
}) => {

  useEffect(()=>{
    if(authType!=='SignIn'){
      getLocation()
    }
    
  }, [authType])

  const getLocation = async() =>{
    const x = await getUserGeoLocation()
    if(x.response===true){
      setShopAddress(x.data);
    }
  }

  console.log(shopAddress)

  return (
    <>
      <div className="container items-center">
        <div className="flex justify-center items-center text-2xl font-bold">
          <span>Join Grow Food</span>
        </div>
        <Container maxWidth="sm">
          <div style={styles.container}>
            {authType === "SignUp" && (
              <>
                <div className="grid md:grid-cols-2 grid-cols-1 w-full justify-between items-center gap-4">
                  <TextField
                    label="Shop Name"
                    fullWidth
                    margin="normal"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  <TextField
                    label="Contact Person Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    label="Mobile"
                    fullWidth
                    margin="normal"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />

                  <TextField
                    label="Shop Address"
                    fullWidth
                    margin="normal"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                  />
                  <Autocomplete
                    options={["Restaurant", "Vendor"]}
                    value={userType}
                    onChange={(event, newValue) => setUserType(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User Type"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                  <TextField
                    label="GST Number"
                    fullWidth
                    margin="normal"
                    value={gst}
                    onChange={(e) => setGst(e.target.value)}
                  />
                </div>
              </>
            )}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <TextField
              label="Password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <div className="flex justify-between items-center">
              <Button
                variant="contained"
                color="inherit"
                onClick={handleAuthSwitch}
              >
                {authType === "SignIn" ? "Create Account" : "Sign In"}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={styles.button}
              >
                {authType === "SignIn" ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

const styles = {
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  button: {
    marginTop: 20,
  },
};

export default Authform;
