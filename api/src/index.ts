import "reflect-metadata";
import express from "express";

import { authenticateUser } from "./utils/authenticateUser";
import { findUser } from "./utils/db";
import jwt from "jsonwebtoken";
import cors from "cors";
import { isAuth } from "./isAuth";

const main = async () => {
  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  authenticateUser(app);

  app.get("/me", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("no auth header");
      res.send({ user: null });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("no token");
      res.send({ user: null });
      return;
    }

    let userId;

    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET);
      console.log("payload bioth", payload);
      userId = payload.userId;
    } catch (error) {
      res.send({ user: null });
      return;
    }

    if (!userId) {
      console.log("no user id");
      res.send({ user: null });
      return;
    }

    const user = await findUser({ github_id: userId });
    console.log("wtf", user);

    res.send({ user });
    return;
  });

  app.post("/todo", isAuth, (req: any, res) => {
    console.log("the fucking todo", req.body);
    console.log("req.userId", req.userId);
    res.send({ text: "lol we autheticated bothc and" });
    return;
  });

  app.post("/allUsers", isAuth, (req: any, res) => {
    console.log("the fucking todo", req.body);
    console.log("req.userId", req.userId);
    res.send({ text: "lol we autheticated bothc and" });
    return;
  });

  app.get("/", (_, res) => {
    res.send("BOOOOM");
  });
  app.listen(3002, () => {
    console.log("listening on port 3002");
  });
};

main();
