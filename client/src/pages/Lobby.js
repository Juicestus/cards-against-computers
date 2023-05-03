import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadLocalData } from "../util";
import { queryBackend } from "../net";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";

const Lobby = () => {

  const navigate = useNavigate();

  const code = useParams().id;
  const localData = loadLocalData();

  if (localData.gameID !== code) {
    alert("You are not part of this game!");
    navigate("/");
  }

  const [gameData, setGameData] = useState({});

   
  useEffect(() => {
    queryBackend(
      "getGameData",
      {
        id: code,
        name: localData.userName,
        privateKey: localData.privateKey
      },
      (content) => {
        console.log(content);
        setGameData(content);
      }
    );

  }, [setGameData]);

  const userListElements = () => {
    const players = gameData["players"];
    const host = gameData["host"];
    if (players === undefined) {
      return "";
    }
      console.log(host);
    return Object.entries(players).map(([name, player]) => {
      const classes = "lobby-card" + (name === host ? " lobby-host-color" : "");
      return (
        <div className={classes}>
          <h2 className="lobby-card-text">{name}{name === host ? "  (host)" : ""}</h2>
        </div>
      );
    });
  }



  return (
    <div className="page">
      <div>
        <h2 className="create-join-back">
          <NavLink to="/">{"←"}</NavLink>
        </h2>
        <h1 className="lobby-heading">
          Lobby {code}.
        </h1>
      </div>
      <div className="home-button-container">
        {userListElements()}
      </div>
      
    </div>
  );
};

export default Lobby;
