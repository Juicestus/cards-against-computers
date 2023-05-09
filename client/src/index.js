import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import Play from "./components/Play";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Join from "./pages/Join";
import Lobby from "./pages/Lobby";
import Prompt from "./pages/Prompt";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/join" element={<Join />} />
      {/* <Route path="/game/:id" element={<Dispatcher />} /> */}
      <Route path="/game/lobby/:id" element={<Lobby />} />
      <Route path="/game/prompt/:id" element={<Prompt />} />
      <Route path="/game/vote/:id" element={<Vote />} />
      <Route path="/game/results/:id" element={<Results />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);
