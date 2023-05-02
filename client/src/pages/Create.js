import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { queryBackend } from "../net";
import { saveLocalData } from "../local";
import { bindInput } from "../util";
import "../styles/create.css"

const Create = () => {
  const [name, setName] = useState("");
  
  const changeHandler = (e) => {
    e.target.value = e.target.value.toUpperCase()
    setName(e.target.value);
  }

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    queryBackend(
      "createNewGame",
      {
        hostName: name,
      },
      (content) => {
        saveLocalData(content.id, content.hostName, content.privateKey);
        navigate("/game/" + content.id);
      }
    );
  };

  return (
    <div className="create-page">
      <div>
        <h1 className="create-heading">
          Create a Game
        </h1>
      </div>
      <div className="create-big-container">
        <p className="create-label">YOUR NAME</p>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          className="create-big-input-box"
          onChange={bindInput(setName)}
        />
        <br></br>
        <Button className="create-big-button" onClick={submitHandler}>Create Game</Button>
      </div>
    </div>
  );
};

export default Create;
