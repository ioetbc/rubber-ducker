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
        .query("select * from user_metadata where github_id = $1;", [github_id])
        .then((result: any) => {
          client.release();
          return result.rows[0];
        });
    })
    .catch((e: any) => console.log(e));
};

export const findUsers = async (body: any) => {
  return pool
    .connect()
    .then(async (client) => {
      console.log(
        "hm,mm",
        `SELECT * from technologies LEFT JOIN user_metadata on technologies.github_id = user_metadata.github_id WHERE ${body.map(
          (technology: { language: string; proficency: number }) =>
            `${technology.language} >= ${technology.proficency}`
        )}`.replaceAll(",", " AND ")
      );
      return client
        .query(
          `SELECT * from technologies LEFT JOIN user_metadata on technologies.github_id = user_metadata.github_id WHERE ${body.map(
            (technology: { language: string; proficency: number }) =>
              `${technology.language} >= ${technology.proficency}`
          )}`.replaceAll(",", " AND ")
        )
        .then((result: any) => {
          client.release();
          return result.rows;
        });
    })
    .catch((e: any) => console.log(e));
};

export const findAllUsers = async () => {
  return pool
    .connect()
    .then(async (client) => {
      return client
        .query(
          "select * from user_metadata left join technologies on user_metadata.github_id = technologies.github_id"
        )
        .then((result: any) => {
          client.release();
          return result.rows;
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
      console.log("trying to insert", github_id, username, avatar_url);
      return client
        .query(
          "insert into user_metadata values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
          [
            github_id,
            username,
            avatar_url,
            "",
            "",
            false,
            false,
            false,
            "",
            null,
            false,
          ]
        )
        .then(() => client.release());
    })
    .catch((e: any) => console.error("error creating user", e));
};
