import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap"
import { createRequestForm } from "../net";
import { saveLocalData } from "../local";

const Create = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        fetch(createRequestForm("createNewGame", {
          hostName: name
        })).then((response) => {
            response.json().then((unpacked) => {
              if (!unpacked.ok) {
                alert(unpacked.msg);
                return;
              }
              const content = unpacked.content;
              saveLocalData(content.id, content.hostName, content.privateKey)
              navigate("/game/" + content.id);
            })
        }).catch(e => {
            alert(e);
        });
    };

	return ( 
    <div>
      <div>
        <h1 className="header" style={{ marginTop: "1em" }}>
          Create a Game
        </h1>
      </div>
      <div style={{ display: "flex", margin: "1em", marginTop: "1.5em" }}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          style={{
            marginLeft: "1.5em",
            width: "10em",
            marginRight: "1em",
            borderRadius: ".1em",
            borderBlockColor: "blue",
            height: "3em",
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={submitHandler}>Create Room</Button>
      </div>
    </div>
  );
};

export default Create;
