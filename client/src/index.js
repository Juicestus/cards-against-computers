import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.css";

const Home = () => {
	return <h1>Cards Against Computers</h1>;
}

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
   </Routes>
  </Router>,

  document.getElementById("root")
);
