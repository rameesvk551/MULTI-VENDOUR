import React from "react";
import ReactDOM from "react-dom/client"; // Use react-dom/client
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");

// Create a root using ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

root.render(
//<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
 // </React.StrictMode>
);

// Call reportWebVitals
reportWebVitals();
