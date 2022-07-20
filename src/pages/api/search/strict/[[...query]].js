import { searchStrict } from "../../../../../lib/db";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const result = await searchStrict(req.query);
  res.status(200).json(result);
}
