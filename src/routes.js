import * as firebaseActions from "./firebase.js";
import express from "express";

const err = (code, msg) => ({ code: code, msg: msg });

export const errors = Object.freeze({
  INVALID_NAME: err(1, "Invalid name"),
  GAME_NOT_FOUND: err(2, "Game not found"),
  GAME_FULL: err(3, "Game full"),
  NAME_TAKEN: err(4, "Name taken"),
  INVALID_PRIVATE_KEY: err(5, "Invalid private key"),
  PLAYER_NOT_FOUND: err(6, "Player not found"),
  UNDEFINED_GAME_DATA: err(7, "Undefined game data"),
});

export const wrapOK = (content) => {
  return { ok: true, code: 0, msg: "", content: content };
};

export const wrapErr = (err) => {
  return { ok: false, code: err.code, msg: err.msg, content: {} };
};

export const gameExists = async (req, res) => {
  const id = req.query.id;
  res.send({ value: await firebaseActions.gameExists(id) });
};

export const getActiveGames = async (req, res) => {
  res.send(await firebaseActions.getActiveGames());
};

export const createNewGame = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const hostName = req.query.hostName;
  if (!hostName) {
    res.status(400).send();
    return;
  }
  res.send(await firebaseActions.createNewGame(hostName));
};

export const joinGame = async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  res.send(await firebaseActions.joinGame(id, name));
};

export const getGameData = async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const privateKey = req.query.privateKey;

  res.send(await firebaseActions.getGameDataAsPlayer(id, name, privateKey));
}

export const leaveGame = (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  const privateKey = req.query.privateKey;

  firebaseActions.leaveGame(id, name, privateKey);
  res.send(wrapOK({}));
}