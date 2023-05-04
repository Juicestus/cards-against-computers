export const bindInput = (callback) => {
    return e => {
        e.target.value = e.target.value.toUpperCase();
        callback(e.target.value);
    }
}