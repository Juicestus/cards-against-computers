import {getState} from "react";
import {useParams} from "react-router-dom";

const Game = () => {
    return (
        <div>
            <h1>Game</h1>
            <p>Game ID: {useParams().id}</p>
        </div>
    );
};

export default Game;

