import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { queryBackend } from "../net";
import { saveLocalData } from "../local";

const Create = () => {
  const [name, setName] = useState("");
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
    <div>
      <h1 className="heading" style={{ marginTop: ".5em", textAlign: "center" }}>
        Create A Game
      </h1>
      <Form>
        <Form.Group
          style={{ marginLeft: "5em", marginRight: "5em", marginTop: "3em" }}
        >
          <div style={{ display: "flex", marginTop: "1em" }}>
            <Form.Control
              type="text"
              id="name"
              name="name"
              placeHolder="Your Name?"
              style={{ marginRight: "1em" }}
              onChange={(event) => setName(event.target.value)}
            />
            <Button onClick={submitHandler}>Create</Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Create;
