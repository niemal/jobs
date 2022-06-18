import { search } from "../../../lib/db";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
    const [ searchQuery, index ] = req.query.query.split('=');
    const result = await search(searchQuery, index);
    res.status(200).json(result);
}