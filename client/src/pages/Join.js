import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { saveLocalData } from "../util";
import { queryBackend } from "../net";
import { bindInput } from "../util";
import { NavLink } from "react-router-dom";

const Join = () => {
  const [gameCode, setGameCode] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    queryBackend(
      "joinGame",
      {
        id: gameCode,
        name: userName,
      },
      (content) => {
        saveLocalData(
          content.id,
          userName,
          content.privateKey,
          content.roundLength,
          content.startTime
        );
        navigate("/game/lobby/" + content.id);
      }
    );
  };

  return (
    <div className="page">
      <div>
        <h2 className="create-join-back">
          <NavLink to="/">{"←"}</NavLink>
        </h2>
        <h1 className="create-join-heading">Join a Game.</h1>
      </div>
      <div className="create-join-big-container">
        <h4 className="create-join-label">Game code.</h4>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          className="create-join-big-input-box"
          onChange={bindInput(setGameCode)}
        />

        <br></br>
        <h4 className="create-join-label" style={{ marginTop: "1em" }}>
          Your name.
        </h4>
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          className="create-join-big-input-box"
          onChange={bindInput(setUserName)}
        />
        <br></br>
        <br></br>
        <Button className="create-join-big-button" onClick={submitHandler}>
          Join Game
        </Button>
      </div>
    </div>
  );
};

export default Join;
