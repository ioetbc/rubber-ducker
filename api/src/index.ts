import express from "express";

const main = () => {
  const app = express();
  app.get("/", (_, res) => {
    res.send("BOOOOM");
  });
  app.listen(3002, () => {
    console.log("listendxaing on port 3002");
  });
};

main();
