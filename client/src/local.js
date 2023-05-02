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