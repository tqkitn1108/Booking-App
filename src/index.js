import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="423832791963-5ui2hk1e4rvd3ilv4pa5l8lqii94fqgr.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>;
  </React.StrictMode>
);
