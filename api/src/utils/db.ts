import { Client } from "pg";

export const findUser = async ({ github_id }: { github_id: string }) => {
  const client = new Client({
    port: 5432,
    database: "rubber-ducker",
    host: "localhost",
  });
  return client
    .connect()
    .then(() =>
      client.query("select * from users where github_id = $1;", [github_id])
    )
    .then((result: any) => result.rows)
    .catch((e: any) => console.log(e))
    .finally(() => {
      client.end();
    });
};

export const createUser = async ({
  username,
  avatar_url,
  github_id,
}: {
  username: string;
  avatar_url: string;
  github_id: string;
}) => {
  const client = new Client({
    port: 5432,
    database: "rubber-ducker",
    host: "localhost",
  });

  return client
    .connect()
    .then(() =>
      client.query("insert into users values ($1, $2, $3)", [
        username,
        github_id,
        avatar_url,
      ])
    )
    .then((result: any) => result.rows)
    .catch((e: any) => console.log(e))
    .finally(() => {
      client.end();
    });
};
