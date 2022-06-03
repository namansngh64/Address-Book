import React from "react";
// import ReactDOM from "react-dom";
import Routes from "./Routes";

// ReactDOM.render(<Routes />, document.getElementById("root"));

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<Routes />);
