import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Login from './screens/loginscreen';


const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Routes>
          <Route path= "/login" element={<Login/>}/>
        </Routes>
      </div>
    </ThemeProvider>

  );
}

export default App