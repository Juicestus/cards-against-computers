export const bindInput = (callback) => {
    return e => {
        e.target.value = e.target.value.toUpperCase();
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
