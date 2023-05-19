import { initializeApp } from "firebase/app";
import fs from "fs";
import path from "path";

import { wrapOK, wrapErr, errors as errs } from "./routes.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { fileURLToPath } from "url";
import {readFile} from 'fs/promises';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, "firebaseconfig.json");
const firebaseConfig = JSON.parse(fs.readFileSync(jsonPath).toString());

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const getLinesFromFile = async (path) => {
  const items = (await readFile(path, 'utf8')).split("\n");
  const map = {};
  for (let i = 0; i < items.length; i++) {
    map[i] = items[i];
  }
  return map;
}

const questions = await getLinesFromFile('./cards/questions.txt');
const responses = await getLinesFromFile('./cards/responses.txt');

const loadFromFirebase = async () => {
  const gamesRef = collection(db, "games");
  const gamesSnapshot = await getDocs(gamesRef);
  const games = {};
  gamesSnapshot.forEach((doc) => {
    games[doc.id] = doc.data();
  });
  return games;
};

// todo: switch to an actual local database
const cachedGames = loadFromFirebase();

const updateCachedDoument = (doc) => {
  cachedGames[doc.id] = doc.data();

//   console.log("\n\nBEGIN DATABASE UPDATE\n");
//   console.log(cachedGames);
//   console.log("\nEND DATABASE UPDATE\n\n");
};

const getDoumentData = async (id) => {
  if (cachedGames[id] === undefined) {
    const gameRef = doc(db, "games", id);
    const data = (await getDoc(gameRef)).data();
    cachedGames[id] = data;
  }
  return structuredClone(cachedGames[id]);
}

export const gameExists = async (id) => {
  return cachedGames[id] !== undefined;
};

const getActiveGames = async () => {
  return Object.keys(cachedGames);
};

// Right now, all names are valid, but this may change later
const nameValid = async (name) => {
  return true;
};

const createID = async () => {
  let id = "";
  let activeGames = await getActiveGames();
  while (id == "" || activeGames.includes(id)) {
    id = createRandomHexString(6);
  }
  return id;
};

const createRandomHexString = (length) =>
  [...Array(length)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("").toUpperCase();

const createPrivateKey = () => {
  return createRandomHexString(16)
};

const createPlayer = (name) => {
  return {
    name: name,
    key: createPrivateKey(),
    score: 0,
    hand: {},
    removeQueded: false,
   };
};

const randomStringTestMap = (len) => {
  const arr = {};
  for (let i = 0; i < len; i++) {
    arr[i] = createRandomHexString(6);
  }
  return arr;
}

export const createNewGame = async (hostName) => {
  const id = await createID();
  const player = createPlayer(hostName);

  if (!nameValid(hostName)) {
    return wrapErr(errs.INVALID_NAME);
  }

  // This is why we should be using typescript!
  // fuck off!
  // https://stackoverflow.com/questions/70731173/firebase-firestoretypeerror-n-indexof-is-not-a-function
  const gameRef = doc(db, "games", id);

  const players = {};
  players[player.name] = player;
    
  const initial = {
    id: id,
    players: players,
    host: player.name,
    round: 0,
    stage: gameStage.LOBBY,
    prompt: "",
    judge: "",
    responses: {},
    unusedPrompts: questions,
    // unusedPrompts: randomStringTestMap(25),
    unusedResponses: responses,
    // unusedResponses: randomStringTestMap(100),
    roundsToWin: 5,
    cardsInHand: 7,
  };

  setDoc(gameRef, initial);

  cachedGames[id] = initial;

  onSnapshot(gameRef, updateCachedDoument);

  return wrapOK({
    id: id,
    name: player.name,
    privateKey: player.key,
  });
};

export const joinGame = async (id, name) => {
  const gameRef = doc(db, "games", id);
  if (!(await gameExists(id))) {
    return wrapErr(errs.GAME_NOT_FOUND);
  }

  const data = await getDoumentData(id);

  const players = data["players"];
  const playerNames = Object.keys(players);
  if (playerNames.length >= 6) {
    return wrapErr(errs.GAME_FULL);
  }
  for (const playerName of playerNames) {
    if (playerName === name) {
      return wrapErr(errs.NAME_TAKEN);
    }
  }

  if (!nameValid(name)) {
    return wrapErr(errs.INVALID_NAME);
  }

  const player = createPlayer(name);
  players[player.name] = player;

  await updateDoc(gameRef, {
    players: players,
  });

  return wrapOK({
    id: id,
    name: name,
    privateKey: player.key,
  });
};

export const gameStage = {
  LOBBY: 0,
  PROMPT: 1,
  VOTE: 2,
  RESULTS: 3,
};

export const getGameDataAsPlayer = async (id, name, privateKey) => {
  const gameRef = doc(db, "games", id);

  if (!(await gameExists(id))) {
    return wrapErr(errs.GAME_NOT_FOUND);
  }

  const data = await getDoumentData(id);

  await (async () => { data !== undefined })();

  const players = data["players"];
  if (Object.keys(players).includes(name)) {
    if (players[name].key !== privateKey) {
      return wrapErr(errs.INVALID_PRIVATE_KEY);
    }
  } else {
    return wrapErr(errs.PLAYER_NOT_FOUND);
  }


  players[name]["removeQueded"] = false;

  updateDoc(gameRef, {
    players: players, 
  });

  data["players"] = removePrivateKeys(players);

  return wrapOK(data);
}

export const removePrivateKeys = (players) => {
  Object.keys(players).forEach((name) => {
    delete players[name].key;
  });
  return players;
}

export const leaveGame = async (id, name, privateKey) => {
  const gameRef = doc(db, "games", id);
  if (!(await gameExists(id))) {
    return wrapErr(errs.GAME_NOT_FOUND);
  }

  const data = await getDoumentData(id);

  if (data === undefined) return wrapErr(errs.UNDEFINED_GAME_DATA);

  const players = data["players"];
  if (Object.keys(players).includes(name)) {
    if (players[name].key !== privateKey) {
      return wrapErr(errs.INVALID_PRIVATE_KEY);
    }
  } else {
    return wrapErr(errs.PLAYER_NOT_FOUND);
  }

  data["players"][name]["removeQueded"] = true;

  updateDoc(gameRef, {
    players: data["players"]
  });

  setTimeout(createRemoveUserTimeout(id, name), 5e3);

  return wrapOK({});
}


export const createRemoveUserTimeout = (id, name) => {
  return async () => {
    const gameRef = doc(db, "games", id);
    if (!(await gameExists(id))) {
      return wrapErr(errs.GAME_NOT_FOUND);
    }

    const data = await getDoumentData(id);
    const players = data["players"];

    if (players[name] == undefined) return;
    if (players[name]["removeQueded"] === false) return;

    delete players[name];

    if (Object.keys(players).length === 0) {
      await deleteDoc(gameRef);
    } else if (name === data["host"]) {
      await deleteDoc(gameRef);
    } else {
      await updateDoc(gameRef, {
        players: players,
      });
    }
  }
}


export const startGame = async (id, name, privateKey) => {
  const gameRef = doc(db, "games", id);
  if (!(await gameExists(id))) {
    return wrapErr(errs.GAME_NOT_FOUND);
  }

  const data = await getDoumentData(id);

  if (data === undefined) return wrapErr(errs.UNDEFINED_GAME_DATA);
 
  const players = data["players"];

  if (Object.keys(players).length < 3) {
    return wrapErr(errs.NOT_ENOUGH_PLAYERS)
  }

  if (Object.keys(players).includes(name)) {
    if (name !== data["host"]) {
      return wrapErr(errs.INVALID_PERMISSIONS);
    }
    if (players[name].key !== privateKey) {
      return wrapErr(errs.INVALID_PRIVATE_KEY);
    }
  } else {
    return wrapErr(errs.PLAYER_NOT_FOUND);
  }

  if (data["stage"] !== gameStage.LOBBY) {
    return wrapErr(errs.UNDEFINED_GAME_DATA);
  }

  await moveFromLobbyToGame(id, gameRef);

  return wrapOK({});
}

export const removeRandomEntry = (map) => {
  const keys = Object.keys(map);
  const key = keys[Math.floor(Math.random() * keys.length)];
  const value = map[key];
  delete map[key];
  return [key, value];
}

export const moveFromLobbyToGame = async (id, gameRef) => {
  const data = await getDoumentData(id);

  const cardsInHand = data["cardsInHand"];
  const unusedPrompts = data["unusedPrompts"];
  const unusedResponses = data["unusedResponses"];
  const round = data["round"];
  const players = data["players"];

  const judge = Object.keys(players)[round % Object.keys(players).length];

  const [index, prompt] = removeRandomEntry(unusedPrompts);

  for (const name of Object.keys(players)) {
    for (let i = 0; i < cardsInHand; i++) {
      const [index, response] = removeRandomEntry(unusedResponses);
      players[name]["hand"][index] = response;
    }
  }

  updateDoc(gameRef, {
    stage: gameStage.PROMPT,
    judge: judge,
    prompt: prompt,
    unusedPrompts: unusedPrompts,
    unusedResponses: unusedResponses,
    players: players,
    round: round + 1,
  });
}