import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./reducers";
import { Provider } from "react-redux";
import { Box } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Box width={{ md: "60%" }} mx="auto">
          <App />
        </Box>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
