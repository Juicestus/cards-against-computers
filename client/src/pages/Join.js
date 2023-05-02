import { useState} from "react"
import {useHistory} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import { saveLocalData } from "../local";
import { queryBackend } from "../net";

const Join = () => {
    const [gameCode, setGameCode] = useState("");
    const [userName, setUserName] = useState("");

    const navigate = useNavigate();
    
    const submitHandler = (event) => {
        event.preventDefault();

        queryBackend("joinGame", {
            id: gameCode,
            name: userName
        }, (content) => {
            saveLocalData(content.id, content.name, content.privateKey)
            navigate("/game/" + content.id);
        });
    }

    return (
        <div>
            <h1>Join Game </h1>
            <Form>
            <Form.Group>
                <Form.Label>Game Code</Form.Label>
                <Form.Control type="text" id="gameCode" name="gameCode" onChange={(e) => setGameCode(e.target.value)}/>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" id="name" name="name" onChange={(e) => setUserName(e.target.value)}/>
                <Button onClick={submitHandler}>Join Game</Button>
            </Form.Group>
            </Form>
               
        </div>
    );
}

export default Join;