import "reflect-metadata";
require("dotenv-safe").config();
import express from "express";
import { Strategy as GitHubStrategy } from "passport-github";
import passport from "passport";
import { findUser, createUser } from "./utils/db";

import { __prod__ } from "./constants";

const main = async () => {
  const app = express();

  // START OF GITHUB 0AUTH
  passport.serializeUser(function (user: any, done) {
    done(null, user.accessToken);
  });
  app.use(passport.initialize());
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (_, __, profile: any, done) => {
        console.log(profile);
        let user = await findUser({ github_id: profile.id });
        const { username, id } = profile;

        if (user.length === 0) {
          await createUser({
            username,
            avatar_url: profile._json.avatar_url,
            github_id: id,
          });
        }
        done(null, { accessToken: "dwdwdwd", refreshToken: "" });
      }
    )
  );
  app.get("/auth/github", passport.authenticate("github", { session: false }));
  app.get(
    "/auth/github/callback",
    passport.authenticate("github", { session: false }),
    function (_req, res) {
      res.send("you logged in correctly");
    }
  );
  // END OF GITHUB 0AUTH

  app.get("/", (_, res) => {
    res.send("BOOOOM");
  });
  app.listen(3002, () => {
    console.log("listening on port 3002");
  });
};

main();
