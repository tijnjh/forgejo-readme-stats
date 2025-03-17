import dotenv from "dotenv";

dotenv.config();

const codeberg_access_token = process.env.CODEBERG_ACCESS_TOKEN;

// the top instance will always be the default
export const instances = [
  {
    domain: "codeberg.org",
    accessToken: codeberg_access_token,
  },
  {
    domain: "git.maid.zone",
  },
];
