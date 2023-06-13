import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadLocalData,
  registerGameLoop,
  getGameLoop,
  gameStage,
  gameStageURL,
  checkCorrectGame } from "../util";
import { queryBackend, queryBackendOnErr, startPinging, instantiateGameUpdater, leaveGame } from "../net";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import Play from "../components/Play";

const Prompt = () => {
  window.addEventListener('beforeunload', e => {
    leaveGame();
  });

  const navigate = useNavigate();
  const code = useParams().id;
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    checkCorrectGame(code, navigate);
    instantiateGameUpdater(gameStage.PROMPT, setGameData, navigate); 
  }, [code, setGameData]);

  const submitHandler = (response) => {
    console.log(response)
  };

  const createBody = () => {
    const me = loadLocalData().userName;
    if (gameData["players"] === undefined) {
      return "";
    } else if (gameData["judge"] === me) {
      return (<div>
        <h1 className="prompt">You are the judge this round. Wait for players to submit responses.</h1>
      </div>);
    } else {
      return <Play prompt={gameData["prompt"]} responses={gameData["players"][me]["hand"]} showButtons={true} submitConsumer={submitHandler}/>
    }
  }

    return (
    <div className="page">
      <div>
        <h2 className="create-join-back">
          <NavLink to="/" onClick={() => leaveGame()}>{"←"}</NavLink>
        </h2>
        {createBody()}
       </div>
    </div>
  );
};

export default Prompt;
