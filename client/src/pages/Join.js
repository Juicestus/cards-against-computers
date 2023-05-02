import { useState} from "react"
import {useHistory} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import { saveLocalData } from "../local";
import * as net from "../net"

const Join = () => {
    const [userGameCode, setUserGameCode] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    
    const submitHandler = (e) => {

        e.preventDefault();

        let ugc = userGameCode;
        console.log(ugc);

        let reqForm = net.BACKEND_URL + "/joinGame" + "?id=" + ugc + "&name=" + userName;
        fetch(reqForm).then((res) => {
            // let good = false;

            let good;
            let message;
            let player;
            res.json().then(resJSON => {
                console.log(resJSON);
                good = resJSON[0];
                message = resJSON[1];
                player = resJSON[2];

                if (good) {
                    saveLocalData(player.id, player.name, player.privateKey);
                    navigate("/game/" + ugc);
                } else {
                    alert(message)
                }
            })

            
        })
    }

            // omar i have to commit rn
    // so just seee the gc
    return (
        <div>
            <h1>Join Game </h1>
            <Form>
            <Form.Group>
                <Form.Label>Game Code</Form.Label>
                <Form.Control type="text" id="gameCode" name="gameCode" onChange={(e) => setUserGameCode(e.target.value)}/>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="name" name="name" onChange={(e) => setUserName(e.target.value)}/>
                <Button onClick={submitHandler}>Join Game</Button>
            </Form.Group>
            </Form>
               
        </div>
    );
}

export default Join;