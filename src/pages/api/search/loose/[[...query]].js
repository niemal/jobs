import { searchLoose } from "../../../../../lib/db";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const result = await searchLoose(req.query);
  res.status(200).json(result);
}
