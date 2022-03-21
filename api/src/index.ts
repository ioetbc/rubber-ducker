import "reflect-metadata";
import express from "express";

import { authenticateUser } from "./utils/authenticateUser";

const main = async () => {
  const app = express();
  authenticateUser(app);
  app.get("/", (_, res) => {
    res.send("BOOOOM");
  });
  app.listen(3002, () => {
    console.log("listening on port 3002");
  });
};

main();
