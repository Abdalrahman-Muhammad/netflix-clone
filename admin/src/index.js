import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { MoviesContextProvider } from "./context/movieContext/MovieContext";
import { ListContextProvider } from "./context/listContext/ListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MoviesContextProvider>
        <ListContextProvider>
          <App />
        </ListContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>
    /
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
