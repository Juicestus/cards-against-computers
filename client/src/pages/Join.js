import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { saveLocalData } from "../local";
import { queryBackend } from "../net";

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
        saveLocalData(content.id, content.name, content.privateKey);
        navigate("/game/" + content.id);
      }
    );
  };

  return (
    <div>
      <h1 className="heading" style={{ marginTop: ".5em" }}>
        Join a Game
      </h1>
      <Form>
        <Form.Group
          style={{ marginLeft: "5em", marginRight: "5em", marginTop: "3em" }}
        >
          <Form.Control
            type="text"
            id="gameCode"
            name="gameCode"
            placeHolder="Enter Game Code"
            onChange={(e) => setGameCode(e.target.value)}
          />
          <div style={{ display: "flex", marginTop: "1em" }}>
            <Form.Control
              type="text"
              id="name"
              name="name"
              placeHolder="Your Name?"
              style={{ marginRight: "1em" }}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button onClick={submitHandler}>Join</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Join;
