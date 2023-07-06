import { useEffect, useState, useRef } from "react";
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
import { NavLink } from "react-router-dom";
import Play from "../components/Play";
import Timer from "../components/Timer";
import Submitted from "../components/Submitted";

const Prompt = () => {
  window.addEventListener("beforeunload", (e) => {
    leaveGame();
  });

  const navigate = useNavigate();
  const gameID = useParams().id;
  const username = loadLocalData().userName;
  const privateKey = loadLocalData().privateKey;
  const [gameData, setGameData] = useState({});
  const roundLength = gameData.roundLength;
  const startTime = gameData.startTime;
  const [submitted, setSubmitted] = useState(false);

  const players = gameData["players"];
  const host = gameData["host"];

  useEffect(() => {
    checkCorrectGame(gameID, navigate);
    instantiateGameUpdater(gameStage.PROMPT, setGameData, navigate);
  }, [gameID, setGameData]);

  const allPlayersSubmitted = () => {
    for (const player of Object.keys(gameData.players)) {
      if (
        gameData.judge !== gameData.players[player].name &&
        gameData.players[player].submittedResponse === ""
      )
        return false;
    }

    return true;
  };

  useEffect(() => {
    if (Object.keys(gameData).length > 0) {
      setSubmitted(gameData.players[username].submittedResponse !== "");

      if (
        ((parseFloat(startTime) + roundLength * 1000 - Date.now()) / 1000 <=
          0 ||
          allPlayersSubmitted()) &&
        username === gameData["judge"]
      ) {
        queryBackend(
          "judgeGame",
          {
            id: gameID,
            name: username,
            privateKey: privateKey,
          },
          () => {
            navigate("/game/judge/" + gameID);
          }
        );
      }
    }
  }, [gameData]);

  const submitHandler = (response) => {
    queryBackend(
      "submitPlayerResponse",
      {
        id: gameID,
        name: username,
        privateKey: privateKey,
        playerResponse: response,
      },
      () => {}
    );
  };

  const createBody = () => {
    if (gameData["players"] === undefined) {
      return "";
    } else if (username === gameData["judge"]) {
      return (
        <div className="home-button-container">
          <h1 className="prompt">
            You are the judge. <br />
          </h1>

          <div className="prompt-timer">
            <Timer roundLength={roundLength} startTime={startTime} />
          </div>

          {Object.values(players)
            .sort()
            .map((player, index) => {
              return player.name === host ? (
                <div key={index}></div>
              ) : (
                <div
                  key={index}
                  className="lobby-card"
                  style={
                    player.submittedResponse !== ""
                      ? { backgroundColor: "#1ab35d" }
                      : { backgroundColor: "#b31a1a" }
                  }
                >
                  <h2 className="lobby-card-text" key={index}>
                    {player.name}
                    {player.submittedResponse !== ""
                      ? " (submitted)"
                      : " (no submission)"}
                  </h2>
                </div>
              );
            })}
        </div>
      );
    } else {
      return submitted ? (
        <Submitted
          roundLength={gameData.roundLength}
          startTime={gameData.startTime}
        />
      ) : (
        <Play
          prompt={gameData["prompt"]}
          responses={gameData["players"][username]["hand"]}
          showButtons={true}
          submitConsumer={submitHandler}
          roundLength={gameData.roundLength}
          startTime={gameData.startTime}
        />
      );
    }
  };

  return (
    <div className="page">
      <div>
        <h2 className="create-join-back">
          <NavLink to="/" onClick={() => leaveGame()}>
            {"←"}
          </NavLink>
        </h2>
        {createBody()}
      </div>
    </div>
  );
};

export default Prompt;
