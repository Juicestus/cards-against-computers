
export const BACKEND_URL = "http://localhost:3001";

export const createRequestForm = (endpoint, params) => {
    let form = BACKEND_URL + "/" + endpoint + "?";
    for (const [name, value] of Object.entries(params)) {
        form += name + "=" + value + "&"; 
    }
    if (form[form.length - 1] in ["?", "&"]) {
        form = form.substring(0, form.length - 1);
    }
    return form;
}