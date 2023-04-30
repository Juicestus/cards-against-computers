import {getState, useState} from "react"
import {useHistory} from "react-router-dom"
import {gameExists, joinGame} from "../firebase"
import {useNavigate} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import "../index.css"

const JoinGame = () => {
    const [userGameCode, setUserGameCode] = getState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    
    const submitHandler = () => {
        joinGame(userGameCode, userName).then(([good, message]) => {
            if (good) {
                navigate("/game/" + userGameCode);
            } else {
                alert(message);
            } 
         });
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
                <Form.Cotrol type="text" id="name" name="name" onChange={(e) => setUserName(e.target.value)}/>
                <Button onClick={submitHandler}>Join Game</Button>
            </Form.Group>
            </Form>
               
        </div>
    );
}

export default JoinGame;