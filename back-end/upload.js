const { getDb, mongoConnect, closeDb } = require("./util/database");

const fs = require("fs");

const fetchData = fs.readFileSync("./anime.json");
const fetchData1 = fs.readFileSync("./frontpage.json");
const data = JSON.parse(fetchData);
const data1 = JSON.parse(fetchData1);
(async () => {
  await mongoConnect();
  let db = getDb();
  await db.collection("animeFrontpage").deleteMany();
  await db.collection("animeFrontpage").insertMany(data1);
  // await db.collection("anime").deleteMany();
  // await db.collection("anime").insertMany(data);
  closeDb();

})();
