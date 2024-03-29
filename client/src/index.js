import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
const requestedScopes = ["profile", "email"];
root.render(
  <React.StrictMode>
      <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          authorizationParams={{
              redirect_uri: `${window.location.origin}/verify-user`,
              audience: process.env.REACT_APP_AUTH0_AUDIENCE,
              scope: requestedScopes.join(" "),
          }}>
          <AuthTokenProvider>
            <App />
          </AuthTokenProvider>
      </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
