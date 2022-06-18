import { getJobs } from "../../../lib/db";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
    console.log(req.query);
    const { index } = req.query;
    const result = await getJobs(index);
    res.status(200).json(result);
}