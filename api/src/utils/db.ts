import { Pool } from "pg";

const pool = new Pool({
  port: 5432,
  database: "rubber-ducker",
  host: "localhost",
});

export const findUser = async ({ github_id }: { github_id: string }) => {
  return pool
    .connect()
    .then(async (client) => {
      return client
        .query("select * from users where github_id = $1;", [github_id])
        .then((result: any) => {
          client.release();
          return result.rows[0];
        });
    })
    .catch((e: any) => console.log(e));
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
  return pool
    .connect()
    .then(async (client) => {
      return client
        .query("insert into users values ($1, $2, $3)", [
          username,
          github_id,
          avatar_url,
        ])
        .then(() => client.release());
    })
    .catch((e: any) => console.log(e));
};
