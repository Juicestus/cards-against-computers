import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.css";

import Homepage from "./pages/Homepage";
import Create from "./pages/Create";
import JoinGame from "./pages/JoinGame";
import Game from "./pages/Game";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/create" element={<Create />} />
      <Route path="/joingame" element={<JoinGame />} />
      <Route path="/game/:id" element={<Game />} />
   </Routes>
  </Router>,

  document.getElementById("root")
);
