import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/index.css";
import { auth, logInWithEmailAndPassword, createNewGame, saveLocalData } from "../firebase";
import { Button } from "react-bootstrap"
import config from "../config.js"

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


    const submitHandler = (e) => {
        e.preventDefault();

        let reqForm = config().backendURL + "/createNewGame" + "?hostName=" + name;

        fetch(reqForm).then((player) => {
            let playerJSON;
            player.json().then((r) => {
                playerJSON = r;

                console.log(playerJSON)
                saveLocalData(playerJSON.id, playerJSON.hostName, playerJSON.privateKey)

                navigate("/game/" + playerJSON.id);
            })
            

        }).catch(e => {
            alert(e);
        })

    }


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
