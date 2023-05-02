import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, logInWithEmailAndPassword, createNewGame } from "../firebase";
import { Button } from "react-bootstrap";
import "../styles/index.css";

const Create = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    let newId;
    createNewGame(name).then((id) => {
      newId = id;
    });
    new navigate("/game/" + newId);
  };

  return (
    <div>
      <h1 style={{ color: "white" }}>Create Game</h1>
      <input
        type="text"
        id="name"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={submitHandler}>Create Game</Button>
    </div>
  );
};

export default Create;
