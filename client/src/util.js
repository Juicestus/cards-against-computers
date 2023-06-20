export const bindInput = (callback) => {
  return (e) => {
    e.target.value = e.target.value.toUpperCase();
    e.target.value = e.target.value.replace(/[^A-Z0-9]/g, "");
    callback(e.target.value);
  };
};

export const saveLocalData = (id, name, privateKey, roundLength, startTime) => {
  sessionStorage.setItem("userName", name);
  sessionStorage.setItem("gameID", id);
  sessionStorage.setItem("privateKey", privateKey);
  sessionStorage.setItem("roundLength", roundLength);
  sessionStorage.setItem("startTime", startTime);
};

export const loadLocalData = () => {
  return {
    userName: sessionStorage.getItem("userName"),
    gameID: sessionStorage.getItem("gameID"),
    privateKey: sessionStorage.getItem("privateKey"),
    roundLength: sessionStorage.getItem("roundLength"),
    startTime: sessionStorage.getItem("startTime"),
  };
};

export const checkCorrectGame = (code, navigate) => {
  if (loadLocalData().gameID !== code) {
    alert("You are not part of this game!");
    navigate("/");
  }
};

export const registerGameLoop = (interval) => {
  sessionStorage.setItem("gameLoop", interval);
};

export const getGameLoop = () => {
  return sessionStorage.getItem("gameLoop");
};

export const gameStage = {
  LOBBY: 0,
  PROMPT: 1,
  JUDGE: 2,
  RESULTS: 3,
};

export const gameStageURL = (stage, code) => {
  // "lobby",
  // "prompt",
  // "judge",
  // "results",
  return "/game/" + Object.keys(gameStage)[stage].toLowerCase() + "/" + code;
};
