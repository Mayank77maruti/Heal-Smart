import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/GlobalStyle";
import ContextProvider from "./context/Context";
import AIContextProvider from "./context/AIContext";
import FilterContextProvider from "./context/FilterContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <AIContextProvider>
      <FilterContextProvider>
        <GlobalStyle />
        <App />
      </FilterContextProvider>
    </AIContextProvider>
  </ContextProvider>
);
