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

const Results = () => {
  const [gameData, setGameData] = useState({});
  const gameID = useParams().id;
  const username = loadLocalData().userName;
  const privateKey = loadLocalData().privateKey;
  const roundNumber = gameData.round;
  const prompt = gameData.prompt;

  const navigate = useNavigate();
  const winner = gameData.lastRoundWinner;
  const judge = gameData.judge;
  const players = gameData.players;

  const [startTime, setStartTime] = useState(Date.now());

  const [sentStartNextRound, setStartNextRound] = useState(false);

  const [initLoadTime, setInitLoadTime] = useState(Date.now());

  useEffect(() => {
    setInitLoadTime(Date.now());
  }, []);

  useEffect(() => {
    setStartNextRound(false);
    checkCorrectGame(gameID, navigate);
    instantiateGameUpdater(gameStage.PROMPT, setGameData, navigate);
  }, [gameID, setGameData]);

  useEffect(() => {
    if (
      Math.round((parseFloat(startTime) + 10 * 1000 - Date.now()) / 1000) === 0
    ) {
      if (username === judge && !sentStartNextRound) {
        console.log("starting next round");
        setStartNextRound(true);
        queryBackend(
          "startNextRound",
          {
            id: gameID,
            name: username,
            privateKey: privateKey,
            startTime: Date.now(),
          },
          (content) => {
            navigate("/game/lobby/" + content.id);
          }
        );
      } else {
        // force update
        setStartNextRound(true);
      }
    }
  });

  const getWinningResponse = () => {
    if (gameData.players !== undefined) {
      for (const player of Object.keys(players)) {
        if (players[player].name === winner) {
          return players[player].submittedResponse;
        }
      }
    }
  };

  return Date.now() - initLoadTime <= 1000 ? (
    <></>
  ) : (
    <div>
      <div style={{ display: "flex" }}>
        <NavLink className="playing-back" to="/">
          {"←"}
        </NavLink>
        <h2 className="playing-back" style={{ marginTop: "1.2em" }}>
          Round {gameData.round}/{gameData.numRounds}
        </h2>
      </div>
      <h1 className="results-heading">
        The winner of round {roundNumber} was {winner}!
      </h1>
      <h3 className="results-sub-heading" style={{ marginTop: "1em" }}>
        They said {getWinningResponse() + " "}
        in response to {prompt}.
      </h3>

      <br />
      <h2 className="results-heading">The next judge will be {judge}.</h2>
      <h2 className="results-sub-heading">
        Auto starting in{" "}
        {Math.max(
          0,
          Math.round((parseFloat(startTime) + 10 * 1000 - Date.now()) / 1000)
        )}
        ...
      </h2>
    </div>
  );
};

export default Results;
