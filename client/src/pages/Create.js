import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { queryBackend } from "../net";
import { saveLocalData } from "../util";
import { bindInput } from "../util";
import { NavLink } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  let [roundLength, setRoundLength] = useState(60);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    queryBackend(
      "createNewGame",
      {
        hostName: name,
        roundLength: roundLength,
      },
      (content) => {
        saveLocalData(content.id, name, content.privateKey, roundLength, null);
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
        <h1 className="create-join-heading">Create a Game.</h1>
      </div>
      <div className="create-join-big-container">
        <h4 className="create-join-label">Your name.</h4>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder=""
          className="create-join-big-input-box"
          onChange={bindInput(setName)}
        />
        <div className="create-set-round-length">
          <h4 className="create-join-label">Round Length.</h4>

          <div className="create-round-length-setter">
            <input
              type="button"
              value="-"
              className="btn btn-danger create-join-button"
              onClick={(e) => {
                e.preventDefault();
                setRoundLength(Math.max(0, --roundLength));
              }}
            />

            <input
              type="text"
              className="create-join-med-input-box"
              onChange={bindInput(setRoundLength)}
              value={roundLength}
            />

            <input
              type="button"
              value="+"
              className="btn btn-success create-join-button"
              onClick={(e) => {
                e.preventDefault();
                setRoundLength(++roundLength);
              }}
            />
          </div>
        </div>

        <Button className="create-join-big-button" onClick={submitHandler}>
          Create Game
        </Button>
      </div>
    </div>
  );
};

export default Create;
