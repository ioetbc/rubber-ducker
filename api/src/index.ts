import "reflect-metadata";
import express from "express";

import { authenticateUser } from "./utils/authenticateUser";
import {
  findUser,
  findTeachers,
  reviews,
  updateUser,
  createReview,
} from "./utils/db";
import jwt from "jsonwebtoken";
import cors from "cors";
import { isAuth } from "./isAuth";

const io = require("socket.io")(3003, {
  cors: {
    origin: "*",
    // origin: [
    //   "*",
    //   "vscode-webview://webviewview-rubber-ducker-sidebar",
    //   "http://localhost:3000",
    // ],
  },
});

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
      userId = payload.userId;
    } catch (error) {
      res.send({ user: null });
      return;
    }

    if (!userId) {
      res.send({ user: null });
      return;
    }

    const user = await findUser({ github_id: userId });

    res.send({ user });
    return;
  });

  app.post("/findTeachers", isAuth, async (req: any, res) => {
    const { userId, body } = req;
    if (!userId) {
      res.send({ user: null });
      return;
    }

    if (body.length < 1) {
      res.send("No filters");
      return;
    }

    const users = await findTeachers({
      github_id: userId,
      minStarRating: body.minStarRating,
      technologies: body.technologies,
      maxTeacherPrice: body.teacherPrice,
    });

    res.send(users);
    return;
  });

  app.post("/createReview", isAuth, async (req: any, res) => {
    const { body, query } = req;

    if (!query.teacher_id) {
      res.send({ user: null });
      return;
    }

    const reviews = await createReview({
      review: body.review,
      stars: body.stars,
      teacher_id: query.teacher_id,
    });

    res.send(reviews);
    return;
  });

  app.put("/updateProfile", isAuth, async (req: any, res) => {
    const { userId, body } = req;

    if (!userId) {
      res.send({ user: null });
      return;
    }

    const users = await updateUser({ body, github_id: userId });

    res.send(users);
    return;
  });

  app.get("/reviews", isAuth, async (req: any, res) => {
    const { query } = req;
    if (!query.github_id) {
      res.send({ user: null });
      return;
    }

    const userReviews = await reviews({ github_id: query.github_id });

    res.send(userReviews);
    return;
  });

  app.get("/", (_, res) => {
    res.send("BOOOOM");
  });

  app.listen(3002, () => {
    console.log("listening on port 3002");
  });

  io.on("connection", (socket: any) => {
    socket.on("message-from-client", (message: string) => {
      console.log("the fucking message that was sent from the client", message);
      socket.broadcast.emit("message-from-server", message);
    });
  });
};

main();
