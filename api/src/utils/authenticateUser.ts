require("dotenv-safe").config();
import { Strategy } from "passport-github";
import passport from "passport";

import { findUser, createUser } from "./db";

export const authenticateUser = (app: any) => {
  passport.serializeUser(function (user: any, done: any) {
    done(null, user.accessToken);
  });
  app.use(passport.initialize());
  passport.use(
    new Strategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async (_, __, profile: any, done) => {
        let user = await findUser({ github_id: profile.id });
        const { username, id } = profile;

        if (!user) {
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
    function (_req: any, res: any) {
      res.send("you logged in correctly");
    }
  );
};
