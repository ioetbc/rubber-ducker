import { Pool } from "pg";

const pool = new Pool({
  port: 5432,
  database: "rubber-ducker",
  host: "localhost",
});

export const updateUser = async ({
  body,
  github_id,
}: {
  body: any;
  github_id: string;
}) => {
  return pool.connect().then(async (client) => {
    const {
      username,
      bio,
      phone_number,
      email_marketing_consent,
      text_message_consent,
      teacher,
      stripe_client_id,
      has_completed_onboarding,
      per_hour_rate,
      javascript,
      html,
      css,
      node,
      python,
      react,
      svelte,
      postgres,
      dynamo_db,
      tensorflow,
    } = body;

    return client
      .query(
        `
        UPDATE user_metadata
        SET
          username = $1,
          bio = $2,
          phone_number = $3,
          email_marketing_consent = $4,
          text_message_consent = $5,
          teacher = $6,
          stripe_client_id = $7,
          has_completed_onboarding = $8,
          per_hour_rate = $9
        WHERE github_id = $10
      `,
        [
          username,
          bio,
          phone_number,
          email_marketing_consent,
          text_message_consent,
          teacher,
          stripe_client_id,
          has_completed_onboarding,
          per_hour_rate,
          github_id,
        ]
      )
      .then(() => {
        client.query(
          `
          UPDATE technologies
          SET
            javascript = $1,
            html = $2,
            css = $3,
            node = $4,
            python = $5,
            react = $6,
            svelte = $7,
            postgres = $8,
            dynamo_db = $9,
            tensorflow = $10
          WHERE github_id = $11
        `,
          [
            javascript,
            html,
            css,
            node,
            python,
            react,
            svelte,
            postgres,
            dynamo_db,
            tensorflow,
            github_id,
          ]
        );
      });
  });
};

export const findUser = async ({ github_id }: { github_id: string }) => {
  return pool
    .connect()
    .then(async (client) => {
      return client
        .query("SELECT * FROM user_metadata WHERE github_id = $1;", [github_id])
        .then((result: any) => {
          return result.rows[0];
        })
        .then(async (userMetaData) => {
          const tech = await client.query(
            "SELECT * FROM technologies WHERE github_id = $1;",
            [github_id]
          );
          client.release();

          return { ...userMetaData, ...tech.rows[0] };
        });
    })
    .catch((e: any) => console.log(e));
};

export const findUsers = async (body: any) => {
  return pool
    .connect()
    .then(async (client) => {
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
      return client
        .query(
          "INSERT INTO user_metadata VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
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
            100,
          ]
        )
        .then(() => {
          client.query(
            "INSERT INTO technologies VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
            [github_id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          );
          client.release();
        });
    })
    .catch((e: any) => console.error("error creating user", e));
};
