import { initializeApp } from "firebase/app";
import fs from "fs"
import path from "path"

import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    getDocs,
} from "firebase/firestore";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, "firebaseconfig.json");
const firebaseConfig = JSON.parse(fs.readFileSync(jsonPath).toString());

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const gameExists = async (id) => {
    return (await getActiveGames()).includes(id);
};

export const getActiveGames = async () => {
    const gamesRef = collection(db, "games");
    const gamesSnap = await getDocs(gamesRef);
    return gamesSnap.docs.map((doc) => doc.id);
}

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
    .join("");

const createPrivateKey = () => {
    return createRandomHexString(16);
};

const createPlayer = (name) => {
    return {
      name: name,
      key: createPrivateKey(),
      score: 0,
      hand: [],
    };
};
  

export const createNewGame = async (hostName) => {
    const id = await createID();
    const player = createPlayer(hostName);
  
    // This is why we should be using typescript!
    // fuck off!
    // https://stackoverflow.com/questions/70731173/firebase-firestoretypeerror-n-indexof-is-not-a-function
    const gameRef = doc(db, "games", id); 
  
    const players = {};
    players[player.name] = player;
  
    setDoc(gameRef, {
      id: id,
      players: players,
      host: player.name,
      round: 0,
      stage: 0,
      prompt: "",
      unusedPrompts: [],
      unusedResponses: [],
    });
  
    // saveLocalData(id, hostName, player.key);
  
    return {
      id: id,
      hostName: hostName,
      privateKey: player.key
    };
};

export const joinGame = async (id, name) => {
    const gameRef = doc(db, "games", id);
    if (await gameExists(id)) {
      return [false, "Game does not exist", {}];
    }
  
    const data = (await getDoc(gameRef)).data();
    data["players"].forEach((player) => {
      if (player.name === name) {
        return [false, "Name already taken", {}];
      }
    });
    
    const player = createPlayer(name);
  
    await updateDoc(gameRef, {
      players: arrayUnion(player),
    });
  
    // saveLocalData(id, name, player.key);
  
    return [
      true,
      "Ok",
      {
        id: id,
        name: name,
        privateKey: player.key
      }
    ];
}

  
  