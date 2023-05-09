import { loadLocalData } from "./util";

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
  queryBackendOnErr(endpoint, params, callback, () => {});
};

export const queryBackendOnErr = (endpoint, params, callback, onError) => {
  const form = createRequestForm(endpoint, params);
  fetch(form)
    .then((response) => {
      response.json().then((unpacked) => {
        console.log(unpacked);
        if (!unpacked.ok) {
          alert("" + unpacked.code + ": " + unpacked.msg);
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