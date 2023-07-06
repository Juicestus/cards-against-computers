import { Carousel, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
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
  const username = loadLocalData().userName;
  const privateKey = loadLocalData().privateKey;

  const [initLoadTime, setInitLoadTime] = useState(Date.now());

  const navigate = useNavigate();

  let [playerResponses, setPlayerResponses] = useState([""]);

  useEffect(() => {
    setInitLoadTime(Date.now());
  }, []);

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
    queryBackend(
      "pickWinner",
      {
        id: gameID,
        name: username,
        privateKey: privateKey,
        winningResponse: response,
      },
      () => {}
    );
  };

  return Date.now() - initLoadTime <= 1000 ? (
    <></>
  ) : (
    <>
      <h2 className="playing-back">
        <NavLink to="/" onClick={() => leaveGame()}>
          {"←"}
        </NavLink>
      </h2>
      {loadLocalData().userName !== gameData.judge ? (
        <>
          <h1 className="judge-player-screen">
            Wait for the judge <br /> to pick the winner.
          </h1>

          <h1 className="submitted-heading">or don't.</h1>
          <h1 className="judge-player-sub-heading">i don't care.</h1>
        </>
      ) : (
        <Play
          prompt={"Pick the best response"}
          responses={playerResponses}
          showButtons={true}
          submitConsumer={submitHandler}
          judging={true}
        />
      )}
    </>
  );
};

export default Judge;
