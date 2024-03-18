import React from 'react';
import AppBarCus from "../components/appbar_custom";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Login() {
  return (<>
      <AppBarCus />
      <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>

      <Typography fontWeight={700}
        style={{ textAlign: 'center', paddingTop: '50px', fontSize: '30px' }}
      >
        Login 
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography fontWeight={300}
          style={{ textAlign: 'center', paddingTop: '5px', fontSize: '13px' }}
        >
          Don't have an account yet?
        </Typography>
        <Button
          variant="text"
          style={{ textTransform: 'none', backgroundColor: 'transparent', border: 'none' }}
          onClick={() => {}}
        >
          <Typography 
            style={{ textAlign: 'center', paddingTop: '5px', fontSize: '13px', color: '#1976d2' }}
          >
            Sign Up
          </Typography>
        </Button>
      </div>
      
    </div></>
  );
}

export default Login;
