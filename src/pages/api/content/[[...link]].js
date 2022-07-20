import { getContent } from "../../../../lib/db";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  let link = "";
  let keys = Object.keys(req.query);

  for (let i = 0; i < keys.length; i++) {
    link += keys[i] + "=" + req.query[keys[i]];
    if (i + 1 !== keys.length) {
      link += "&";
    }
  }

  const result = await getContent(link);

  if (result === undefined) {
    res.status(200).json({ notFound: true });
  } else {
    res.status(200).json(result);
  }
}
