require("dotenv").config();
const { MongoClient } = require("mongodb");

let uri;
if (process.env.MONGODB_PASS) {
  uri = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${
    process.env.MONGODB_HOST ?? "localhost"
  }:${process.env.MONGODB_PORT}/jobs`;
  console.log("uri:", uri);
} else {
  uri = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/`;
}

let client = null;
let db = null;

const sortEntries = (obj) => {
  return Object.entries(obj)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
};

export async function searchLoose(query) {
  if (!client) {
    client = await MongoClient.connect(uri);
    db = client.db("jobs");
  }

  let tags = query.tags ?? "any";
  let levels = query.levels ?? "any";
  let dateQuery = query.date ?? "any";
  let searchQuery = query.search ?? "";
  let index = query.index ?? 0;

  //let [tags, levels, dateQuery, searchQuery] = query.split('&`');

  if (tags === "any") {
    tags = [];
  } else {
    tags = tags.replace("sharp", "#");

    if (tags.indexOf(",") > -1) {
      tags = tags.split(",");
    } else {
      tags = [tags];
    }
  }

  if (levels === "any") {
    levels = [];
  } else if (levels.indexOf(",") > -1) {
    levels = levels.split(",");
  } else {
    levels = [levels];
  }

  let fromDate, toDate;
  if (dateQuery !== "any") {
    let splitted = dateQuery.split("-");

    if (splitted.length === 1) {
      let fromSplit = splitted[0].split("_");

      if (fromSplit.length !== 3) {
        return { invalidDate: true };
      } else {
        fromDate = new Date(
          +fromSplit[2],
          +fromSplit[1] - 1,
          +fromSplit[0]
        ).getTime();

        if (isNaN(fromDate)) {
          return { invalidDate: true };
        }
      }
    } else {
      let fromSplit = splitted[0].split("_");
      let toSplit = splitted[1].split("_");

      if (fromSplit.length !== 3 || toSplit.length !== 3) {
        return { invalidDate: true };
      } else {
        fromDate = new Date(
          +fromSplit[2],
          +fromSplit[1] - 1,
          +fromSplit[0]
        ).getTime();
        toDate = new Date(+toSplit[2], +toSplit[1] - 1, +toSplit[0]).getTime();

        if (isNaN(fromDate) || isNaN(toDate)) {
          return { invalidDate: true };
        }
      }
    }
  }

  let cursor;

  if (levels.length === 0 && tags.length === 0) {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  } else if (tags.length === 0) {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.level": { $in: levels },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.level": { $in: levels },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.level": { $in: levels },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  } else if (levels.length === 0) {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $in: tags },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $in: tags },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $in: tags },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  } else {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $in: tags },
          "info.level": { $in: levels },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $in: tags },
          "info.level": { $in: levels },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $in: tags },
          "info.level": { $in: levels },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  }

  let n = await cursor.count();
  if (n === 0) {
    return { notFound: true };
  }

  let result = await cursor.skip(+index).limit(5).toArray();

  for (let i = 0; i < result.length; i++) {
    result[i].info.content = result[i].info.content.substr(0, 5000);
  }

  result.push(n);

  return result;
}

export async function searchStrict(query) {
  if (!client) {
    client = await MongoClient.connect(uri);
    db = client.db("jobs");
  }

  let tags = query.tags ?? "any";
  let levels = query.levels ?? "any";
  let dateQuery = query.date ?? "any";
  let searchQuery = query.search ?? "";
  let index = query.index ?? 0;

  //let [tags, levels, dateQuery, searchQuery] = query.split('&`');

  if (tags === "any") {
    tags = [];
  } else {
    tags = tags.replace("sharp", "#");

    if (tags.indexOf(",") > -1) {
      tags = tags.split(",");
    } else {
      tags = [tags];
    }
  }

  if (levels === "any") {
    levels = [];
  } else if (levels.indexOf(",") > -1) {
    levels = levels.split(",");
  } else {
    levels = [levels];
  }

  let fromDate, toDate;
  if (dateQuery !== "any") {
    let splitted = dateQuery.split("-");

    if (splitted.length === 1) {
      let fromSplit = splitted[0].split("_");

      if (fromSplit.length !== 3) {
        return { invalidDate: true };
      } else {
        fromDate = new Date(
          +fromSplit[2],
          +fromSplit[1] - 1,
          +fromSplit[0]
        ).getTime();

        if (isNaN(fromDate)) {
          return { invalidDate: true };
        }
      }
    } else {
      let fromSplit = splitted[0].split("_");
      let toSplit = splitted[1].split("_");

      if (fromSplit.length !== 3 || toSplit.length !== 3) {
        return { invalidDate: true };
      } else {
        fromDate = new Date(
          +fromSplit[2],
          +fromSplit[1] - 1,
          +fromSplit[0]
        ).getTime();
        toDate = new Date(+toSplit[2], +toSplit[1] - 1, +toSplit[0]).getTime();

        if (isNaN(fromDate) || isNaN(toDate)) {
          return { invalidDate: true };
        }
      }
    }
  }

  let cursor;

  if (levels.length === 0 && tags.length === 0) {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  } else if (tags.length === 0) {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.level": { $all: levels },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.level": { $all: levels },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.level": { $all: levels },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  } else if (levels.length === 0) {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $all: tags },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $all: tags },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $all: tags },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  } else {
    if (fromDate > 0 && toDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $all: tags },
          "info.level": { $all: levels },
          "info.time": { $gte: fromDate, $lte: toDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else if (fromDate > 0) {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $all: tags },
          "info.level": { $all: levels },
          "info.time": { $gte: fromDate },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    } else {
      cursor = db
        .collection("jobs")
        .find({
          "info.content": { $regex: searchQuery, $options: "i" },
          "info.skills": { $all: tags },
          "info.level": { $all: levels },
        })
        .project({ _id: 0 })
        .sort({ "info.time": -1 });
    }
  }

  let n = await cursor.count();
  if (n === 0) {
    return { notFound: true };
  }

  let result = await cursor.skip(+index).limit(5).toArray();

  for (let i = 0; i < result.length; i++) {
    result[i].info.content = result[i].info.content.substr(0, 5000);
  }

  result.push(n);

  return result;
}

export async function search(query, index) {
  if (!client) {
    client = await MongoClient.connect(uri);
    db = client.db("jobs");
  }

  let cursor = db
    .collection("jobs")
    .find({
      "info.content": { $regex: query, $options: "i" },
    })
    .project({ _id: 0 })
    .sort({ "info.time": -1 });
  let n = await cursor.count();

  if (n === 0) {
    return { notFound: true };
  }

  let result = await cursor.skip(+index).limit(5).toArray();

  for (let i = 0; i < result.length; i++) {
    result[i].info.content = result[i].info.content.substr(0, 5000);
  }

  result.push(n);

  return result;
}

/*export async function getContent(link) {
    if (!client) {
        client = await MongoClient.connect(uri);
        db = client.db('jobs');
    }

    let cursor = db.collection('jobs').find({ link: link })
        .project({
            _id: 0, link: 0,
            "info.skills": 0, "info.level": 0,
            "info.time": 0, origin: 0,
            title: 0, "info.exp": 0
        });
    let result = await cursor.next();

    return result;
}*/

export async function getJobs(index) {
  if (!client) {
    client = await MongoClient.connect(uri);
    db = client.db("jobs");
  }

  let cursor = db
    .collection("jobs")
    .find()
    .project({ _id: 0 })
    .sort({ "info.time": -1 });
  let n = await cursor.count();
  let result = await cursor.skip(+index).limit(5).toArray();

  for (let i = 0; i < result.length; i++) {
    result[i].info.content = result[i].info.content.substr(0, 5000);
  }

  result.push(n);

  return result;
}

export async function getStatistics() {
  if (!client) {
    client = await MongoClient.connect(uri);
    db = client.db("jobs");
  }

  const generalStats = await db
    .collection("statistics")
    .findOne({ type: "general" }, { projection: { _id: 0, type: 0 } });

  generalStats.skills = sortEntries(generalStats.skills);
  generalStats.levels = sortEntries(generalStats.levels);

  let comboStats = await db
    .collection("statistics")
    .find({ type: "combo" }, { projection: { _id: 0, type: 0 } })
    .next();
  comboStats = sortEntries(comboStats);

  let counter = 0;
  let resultComboStats = {};
  for (let combo in comboStats) {
    resultComboStats[combo] = comboStats[combo];
    counter += 1;

    if (counter === 20) {
      break;
    }
  }

  return {
    ...generalStats,
    comboSkills: resultComboStats,
  };
}
