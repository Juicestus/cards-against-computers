import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadLocalData, registerGameLoop, getGameLoop } from "../util";
import { queryBackend, queryBackendOnErr, startPinging } from "../net";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

const leaveGame = () => {
  clearInterval(getGameLoop());

  const localData = loadLocalData();

  queryBackend(
    "leaveGame",
    {
      id: localData.gameID,
      name: localData.userName,
      privateKey: localData.privateKey,
    },
    (content) => {
    }
  ); 
}

const Lobby = () => {

  window.addEventListener('beforeunload', e => leaveGame());

  const navigate = useNavigate();

  const code = useParams().id;

  const [gameData, setGameData] = useState({});

  useEffect(() => {
    const localData = loadLocalData();

    if (localData.gameID !== code) {
      alert("You are not part of this game!");
      navigate("/");
    }

    setTimeout(() => {
      const inteval = setInterval(() => {
        queryBackendOnErr(
          "getGameData",
          {
            id: code,
            name: localData.userName,
            privateKey: localData.privateKey,
          },
          (content) => {
            setGameData(content);
          },
          (unpacked) => {
            if (unpacked.code === 2) {
              alert("Host left.")
              leaveGame();
            }
            navigate("/");
           }
        );
      }, 1000);
      registerGameLoop(inteval);
    }, 0);
    
  }, [code, setGameData]);

  const userListElements = () => {
    const players = gameData["players"];
    const host = gameData["host"];
    if (players === undefined) {
      return "";
    }
    return (
      <>
        <h2 className="lobby-players-label">Players.</h2>
        {Object.entries(players).map(([name, player]) => {
          const classes =
            "lobby-card" + (name === host ? " lobby-host-color" : "");
          return (
            <div className={classes}>
              <h2 className="lobby-card-text">
                {name}
                {name === host ? "  (host)" : ""}
              </h2>
            </div>
          );
        })}
      </>
    );
  };

  const startGameButton = () => {
    if (gameData["host"] === loadLocalData().userName) {
      return (
        <Button className="lobby-start-game-button" onClick={startGameHandler}>
          Start Game
        </Button>
      );
    }
    return <div></div>;
  };

  const startGameHandler = () => {
    const localData = loadLocalData();

    queryBackend(
      "startGame",
      {
        id: code,
        name: localData.userName,
        privateKey: localData.privateKey,
      },
      (content) => {
        navigate("/game/" + code);
      }
    );
  };

  return (
    <div className="page">
      <div>
        <h2 className="create-join-back">
          <NavLink to="/" onClick={() => leaveGame()}>{"←"}</NavLink>
        </h2>
        <h1 className="lobby-heading">Lobby {code}.</h1>
      </div>
      <div className="home-button-container">
        {startGameButton()}
        {userListElements()}
      </div>
    </div>
  );
};

export default Lobby;
