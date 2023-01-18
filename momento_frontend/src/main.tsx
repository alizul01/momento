import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import {GoogleOAuthProvider} from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={"392950920372-uopag8c4if40o3hdq3idn9l0jnb4etvg.apps.googleusercontent.com"}>
        <Router>
            <App />
        </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
