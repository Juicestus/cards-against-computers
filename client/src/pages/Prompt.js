import { useEffect, useState } from "react";
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

const Prompt = () => {
  window.addEventListener("beforeunload", (e) => {
    leaveGame();
  });

  const navigate = useNavigate();
  const gameID = useParams().id;
  const username = loadLocalData().userName;
  const privateKey = loadLocalData().privateKey;
  const roundLength = loadLocalData().roundLength;
  const [gameData, setGameData] = useState({});
  const startTime = gameData.startTime;
  const [successfulSubmission, setSuccessfulSubmission] = useState(null);

  const players = gameData["players"];
  const host = gameData["host"];

  useEffect(() => {
    checkCorrectGame(gameID, navigate);
    instantiateGameUpdater(gameStage.PROMPT, setGameData, navigate);
  }, [gameID, setGameData]);

  const submitHandler = (response) => {
    queryBackend(
      "submitPlayerResponse",
      {
        id: gameID,
        name: username,
        privateKey: privateKey,
        playerResponse: response,
      },
      (data) => {
        if (data.allGood) setSuccessfulSubmission(true);
        else setSuccessfulSubmission(false);
      }
    );
  };

  const createBody = () => {
    if (gameData["players"] === undefined) {
      return "";
    } else if (username === gameData["judge"]) {
      console.log(loadLocalData().roundLength);
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
                <></>
              ) : (
                <div
                  className="lobby-card"
                  style={
                    player.submittedResponse !== ""
                      ? { backgroundColor: "#1ab35d" }
                      : { backgroundColor: "#b31a1a" }
                  }
                  key={index}
                >
                  <h2 className="lobby-card-text">
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
      return (
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
