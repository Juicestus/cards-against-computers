import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.css";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Lobby from "./pages/Lobby";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/join" element={<Join />} />
      <Route path="/game/:id" element={<Lobby />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);
