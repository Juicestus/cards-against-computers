import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { queryBackend } from "../net";
import { saveLocalData } from "../local";
import { bindInput } from "../util";
import { NavLink } from "react-router-dom";
import "../styles/create-join.css"

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
    <div className="create-join-page">
      <div>
        <h2 className="create-join-back">
          <NavLink to="/">{"←"}</NavLink>
        </h2>
        <h1 className="create-join-heading">
          Create a Game
        </h1>
      </div>
      <div className="create-join-big-container">
        <h4 className="create-join-label">Your name</h4>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          className="create-join-big-input-box"
          onChange={bindInput(setName)}
        />
        <br></br>
        <br></br>
        <Button className="create-join-big-button" onClick={submitHandler}>Create Game</Button>
      </div>
    </div>
  );
};

export default Create;
