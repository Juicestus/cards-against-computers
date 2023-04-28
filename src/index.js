const express = require("express");
 
const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", req.get("Access-Control-Request-Headers"));
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})