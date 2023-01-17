import express from "express";
import router from "./routers/index.js";

const server = express();
server.use(express.json());

server.use(router);

const port : number = 4000;
server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});