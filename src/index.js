import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpeechProvider
    appId="cdf7b252-c01d-4581-bbf2-f12704d9d9a8"
    debug
    logSegments
  >
    <Provider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </SpeechProvider>
);
