import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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

// const firebaseConfig = {
//   apiKey: "AIzaSyBxg_tzkZg9y_GJdq7DuOU5-NRI12UbD5M",
//   authDomain: "cards-against-humanity-76d45.firebaseapp.com",
//   projectId: "cards-against-humanity-76d45",
//   storageBucket: "cards-against-humanity-76d45.appspot.com",
//   messagingSenderId: "468637051485",
//   appId: "1:468637051485:web:ae1e184b247ee02ff5bbb4",
//   measurementId: "G-6G066019LS",
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// export const gameExists = async (id) => {
//   return (await getActiveGames()).includes(id);
// };

// export const getActiveGames = async () => {
//   const gamesRef = collection(db, "games");
//   const gamesSnap = await getDocs(gamesRef);
//   return gamesSnap.docs.map((doc) => doc.id);
// }

// const createID = async () => {
//   let id = "";
//   let activeGames = await getActiveGames();
//   while (id == "" || activeGames.includes(id)) {
//     id = createRandomHexString(6);
//   }
//   return id;
// };

// const createRandomHexString = (length) =>
//   [...Array(length)]
//     .map(() => Math.floor(Math.random() * 16).toString(16))
//     .join("");

// const createPrivateKey = () => {
//   return createRandomHexString(16);
// };

// const createPlayer = (name) => {
//   return {
//     name: name,
//     key: createPrivateKey(),
//     score: 0,
//     hand: [],
//   };
// };

export const saveLocalData = (id, name, privateKey) => {
  localStorage.setItem("userName", name);
  localStorage.setItem("gameID", id);
  localStorage.setItem("privateKey", privateKey);
};
export const getLocalData = () => {
  return {
    userName: localStorage.getItem("userName"),
    gameID: localStorage.getItem("gameID"),
    privateKey: localStorage.getItem("privateKey"),
  };
};

// export const createNewGame = async (hostName) => {
//   const id = await createID();
//   const player = createPlayer(hostName);

//   // This is why we should be using typescript!
//   // fuck off!
//   // https://stackoverflow.com/questions/70731173/firebase-firestoretypeerror-n-indexof-is-not-a-function
//   const gameRef = doc(db, "games", id); 

//   const players = {};
//   players[player.name] = player;

//   setDoc(gameRef, {
//     id: id,
//     players: players,
//     host: player.name,
//     round: 0,
//     stage: 0,
//     prompt: "",
//     unusedPrompts: [],
//     unusedResponses: [],
//   });

//   saveLocalData(id, hostName, player.key);

//   return id;
// };


// export const joinGame = async (id, name) => {
//   const gameRef = doc(db, "games", id);
//   if (await gameExists(id)) {
//     return [false, "Game does not exist"];
//   }

//   const data = (await getDoc(gameRef)).data();
//   data["players"].forEach((player) => {
//     if (player.name === name) {
//       return [false, "Name already taken"];
//     }
//   });
  
//   const player = createPlayer(name);

//   await updateDoc(gameRef, {
//     players: arrayUnion(player),
//   });

//   saveLocalData(id, name, player.key);

//   return [true, "Ok"];
// }