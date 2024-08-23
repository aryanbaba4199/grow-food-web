import React from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
} from '@mui/material';

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
  shopName, setShopName,
}) => {
  return (
    <>
    <div className='container items-center'>
    <div className='flex justify-center items-center text-2xl font-bold'>
      <span>Join Grow Food</span>
    </div>
    <Container maxWidth="sm">
      <div style={styles.container}>
        
        {authType === 'SignUp' && (
          <>
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
        <Button variant="contained" color="primary" onClick={handleSubmit} style={styles.button}>
          {authType === 'SignIn' ? 'Sign In' : 'Create Account'}
        </Button>
        <Button variant="text" onClick={handleAuthSwitch}>
          {authType === 'SignIn' ? 'Create Account' : 'Sign In'}
        </Button>
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
    backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 20,
  },
};

export default Authform;
