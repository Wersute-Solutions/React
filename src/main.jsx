import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(

  
    <GoogleOAuthProvider clientId='179057463317-lhlgh40gafpsnued6ahcue0nrtmnp9ng.apps.googleusercontent.com'>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
 
);
