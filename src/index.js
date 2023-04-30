import express from "express"
import * as firebaseActions from "./firebaseActions.js"
 
const app = express();
const PORT = 3001;

app.use(express.json());

// implements query parameters for data exchange!

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", req.get("Access-Control-Request-Headers"));
    next();
});

app.get('/gameExists', async (req, res) => {
    let id = req.query.id;
    console.log(id)
    res.send( {"value" : await firebaseActions.gameExists(id) } )
});

app.get('/getActiveGames', async (req, res) => {

    res.send(await firebaseActions.getActiveGames());
})

app.get('/createNewGame', async (req, res) => {
    let hostName = req.query.hostName;
    if (!hostName) {
        res.status(400).send();
        return;
    }
    res.send(await firebaseActions.createNewGame(hostName));
})

app.get('/joinGame', async (req, res) => {
    let id = req.query.id;
    let name = req.query.name;

    res.send(await firebaseActions.joinGame(id, name));
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})