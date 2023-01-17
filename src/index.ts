import express from "express";
import { getChampions } from "./controllers/championsController.js";

const server = express();

server.get("/champions", getChampions);

const port = 4000;
server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});