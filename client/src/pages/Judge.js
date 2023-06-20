import { Carousel, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadLocalData,
  registerGameLoop,
  getGameLoop,
  gameStage,
  gameStageURL,
  checkCorrectGame,
} from "../util";
import {
  queryBackend,
  queryBackendOnErr,
  startPinging,
  instantiateGameUpdater,
  leaveGame,
} from "../net";
import Play from "../components/Play";

const Judge = () => {
  const [gameData, setGameData] = useState({});
  const gameID = useParams().id;
  const navigate = useNavigate();

  let [playerResponses, setPlayerResponses] = useState([""]);

  useEffect(() => {
    checkCorrectGame(gameID, navigate);
    instantiateGameUpdater(gameStage.PROMPT, setGameData, navigate);
  }, [gameID, setGameData]);

  useEffect(() => {
    getPlayerResponses();
  }, [gameData]);

  const getPlayerResponses = () => {
    if (gameData.players !== undefined && playerResponses.length === 1) {
      playerResponses = [];

      for (const player of Object.keys(gameData.players)) {
        if (gameData.judge !== gameData.players[player].name) {
          playerResponses.push(gameData.players[player].submittedResponse);
        }
      }

      setPlayerResponses(playerResponses);
    }
  };

  const submitHandler = (response) => {
    console.log(response);
  };
  return (
    <Play
      prompt={"Pick the best response"}
      responses={playerResponses}
      showButtons={true}
      submitConsumer={submitHandler}
      judging={true}
    />
  );
};

export default Judge;
