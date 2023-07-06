import express from "express";
import cors from "cors";
import * as routes from "./routes.js";

const app = express();
const PORT = 3001;

app.use(express.json());

// implements query parameters for data exchange!

app.use(cors());

app.get("/gameExists", routes.gameExists);

app.get("/getActiveGames", routes.getActiveGames);

app.get("/createNewGame", routes.createNewGame);

app.get("/joinGame", routes.joinGame);

app.get("/getGameData", routes.getGameData);

app.get("/leaveGame", routes.leaveGame);

app.get("/startGame", routes.startGame);

app.get("/submitPlayerResponse", routes.submitPlayerResponse);

app.get("/judgeGame", routes.judgeGame);

app.get("/pickWinner", routes.pickWinner);

app.get("/startNextRound", routes.startNextRound);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
