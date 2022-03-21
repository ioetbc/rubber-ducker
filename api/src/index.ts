import "reflect-metadata";
require("dotenv-safe").config();
import express from "express";
import { Client } from "pg";
import { Strategy as GitHubStrategy } from "passport-github";
import passport from "passport";

import { __prod__ } from "./constants";

const main = async () => {
  const client = new Client({
    port: 5432,
    database: "rubber-ducker",
    host: "localhost",
  });

  const client2 = new Client({
    port: 5432,
    database: "rubber-ducker",
    host: "localhost",
  });

  const createUser = async ({
    username,
    avatar_url,
    github_id,
  }: {
    username: string;
    avatar_url: string;
    github_id: string;
  }) => {
    console.log("hmmm", { username, avatar_url, github_id });
    return (
      client2
        .connect()
        .then(() => console.log("connected to the db"))
        .then(() =>
          client2.query("insert into users values ($1, $2, $3)", [
            username,
            avatar_url,
            github_id,
          ])
        )
        // .then(() => client2.query("select * from users"))
        .then((result: any) => result.rows)
        .catch((e: any) => console.log(e))
        .finally(() => {
          console.log("killing the cliebnt 2");
          client2.end();
        })
    );
  };

  const findUser = async ({ github_id }: { github_id: string }) => {
    return client
      .connect()
      .then(() => console.log("connected to the db"))
      .then(() =>
        client.query("select * from users where github_id = $1;", [github_id])
      )
      .then((result: any) => result.rows)
      .catch((e: any) => console.log(e))
      .finally(() => {
        console.log("killing the cliebnt 1");
        client.end();
      });
  };

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
        console.log("user", user);
        const { username, id } = profile;

        if (!user.length) {
          await createUser({
            username,
            avatar_url: profile._json.avatar_url,
            github_id: id,
          });
        }
        done(null, { accessToken: "dwdwdwd", refreshToken: "" });
        // User.findOrCreate({ githubId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
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
