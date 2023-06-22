import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadLocalData, registerGameLoop, getGameLoop, gameStage, gameStageURL } from "./util";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

export const BACKEND_URL = "http://localhost:3001";

export const createRequestForm = (endpoint, params) => {
  let form = BACKEND_URL + "/" + endpoint + "?";
  for (const [name, value] of Object.entries(params)) {
    form += name + "=" + value + "&";
  }
  if (["?", "&"].includes(form[form.length - 1])) {
    form = form.substring(0, form.length - 1);
  }
  return form;
};

export const queryBackend = (endpoint, params, callback) => {
  queryBackendOnErr(endpoint, params, callback, (unpacked) => {
    alert("" + unpacked.code + ": " + unpacked.msg);
  });
};

export const queryBackendOnErr = (endpoint, params, callback, onError) => {
  const form = createRequestForm(endpoint, params);
  fetch(form)
    .then((response) => {
      console.log(response);
      response.json().then((unpacked) => {
        console.log(unpacked);
        if (!unpacked.ok) {
          onError(unpacked);
          return;
        }
        callback(unpacked.content);
      });
    })
    .catch((err) => {
      // if (verbose)
        // alert(err);
    });
};

export const instantiateGameUpdater = (stage, setGameData, navigate) => {
  const localData = loadLocalData();
  setTimeout(() => {
    const inteval = setInterval(() => {
      queryBackendOnErr(
        "getGameData",
        {
          id: localData.gameID,
          name: localData.userName,
          privateKey: localData.privateKey,
        },
        (content) => {
          setGameData(content);

          if (content["stage"] !== stage) {
            navigate(gameStageURL(content["stage"], localData.gameID));
          }
        },
        (unpacked) => {
          if (unpacked.code === 2) {
            alert("Host left.")
            navigate("/");
            leaveGame();
            window.location.reload();
          }
          navigate("/");
          }
      );
    }, 1000);
    registerGameLoop(inteval);
  }, 0);
};

export const leaveGame = () => {
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

