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

const Prompt = () => {
  window.addEventListener("beforeunload", (e) => {
    leaveGame();
  });

  const navigate = useNavigate();
  const gameID = useParams().id;
  const username = loadLocalData().userName;
  const privateKey = loadLocalData().privateKey;
  const [gameData, setGameData] = useState({});
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

  console.log(players);

  const createBody = () => {
    if (gameData["players"] === undefined) {
      return "";
    } else if (username === gameData["judge"]) {
      return (
        <div className="home-button-container">
          <h1 className="prompt">
            You are the judge this round. <br />
          </h1>

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
                    {player.submittedResponse !== "" ? " (" : " (has not "}
                    submitted)
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
