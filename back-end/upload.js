const { getDb, mongoConnect, closeDb } = require("./util/database");

const fs = require("fs");

const fetchData = fs.readFileSync("./anime.json");
const fetchData1 = fs.readFileSync("./frontpage.json");
const fetchData2 = fs.readFileSync("./ongoing.json");
const fetchData3 = fs.readFileSync("./popular.json");
const data = JSON.parse(fetchData);
const data1 = JSON.parse(fetchData1);
const data2 = JSON.parse(fetchData2);
const data3 = JSON.parse(fetchData3);
(async () => {
  await mongoConnect();
  let db = getDb();
  await db.collection("animeFrontpage").deleteMany();
  await db.collection("animeFrontpage").insertMany(data1);
  await db.collection("ongoingAnimes").deleteMany();
  await db.collection("ongoingAnimes").insertMany(data2);
  await db.collection("popular").deleteMany();
  await db.collection("popular").insertMany(data3);
  // await db.collection("anime").deleteMany();
  // await db.collection("anime").insertMany(data);
  closeDb();

})();
