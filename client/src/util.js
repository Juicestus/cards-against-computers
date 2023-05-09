export const bindInput = (callback) => {
    return e => {
        e.target.value = e.target.value.toUpperCase();
        e.target.value = e.target.value.replace(/[^A-Z0-9]/g, "");
        callback(e.target.value);
    }
}

export const saveLocalData = (id, name, privateKey) => {
  localStorage.setItem("userName", name);
  localStorage.setItem("gameID", id);
  localStorage.setItem("privateKey", privateKey);
};

export const loadLocalData = () => {
  return {
    userName: localStorage.getItem("userName"),
    gameID: localStorage.getItem("gameID"),
    privateKey: localStorage.getItem("privateKey"),
  };
};

export const registerGameLoop = (interval) => {
    localStorage.setItem("gameLoop", interval);
}

export const getGameLoop = () => {
    return localStorage.getItem("gameLoop");
}

export const gameStage = {
  LOBBY: 0,
  PROMPT: 1,
  VOTE: 2,
  RESULTS: 3,
};

export const gameStageURL = (stage, code) => {
  // "lobby",
  // "prompt",
  // "vote",
  // "results",
  return "/game/" + Object.keys(gameStage)[stage].toLowerCase() + "/" + code;
};