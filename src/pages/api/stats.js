import { getStatistics } from "../../../lib/db";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  const result = await getStatistics();
  res.status(200).json(result);
}
