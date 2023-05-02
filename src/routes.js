import * as firebaseActions from "./firebase.js";
import express from "express";

export const wrapOK = (content) => {
  return { ok: true, msg: "", content: content };
};

export const wrapErr = (msg) => {
  return { ok: false, msg: msg, content: {} };
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
