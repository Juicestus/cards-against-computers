import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth, logInWithEmailAndPassword, createNewGame, saveLocalData } from "../firebase";
import { Button } from "react-bootstrap"
import config from "../config.js"

const Create = () => {

    // jacob i have to commit rn
    // so just seee the gc

    const [name, setName] = useState("");
    const navigate = useNavigate();

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
        <h1>Create Game</h1>
        <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)}/>
        <Button onClick={submitHandler}>Create Game</Button>
    </div>
    )
   
}

export default Create;