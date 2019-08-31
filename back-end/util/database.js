const { MongoClient } = require("mongodb");

let _db;

require("dotenv").config();
const uri = process.env.ATLAS_URI;

async function mongoConnect(callback) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  console.log("Database connected");
  _db = client.db();
  _client = client;
  if (callback) callback();
}

function getDb() {
  if (_db) return _db;
  throw "No database found! ./util/database.js -> function getDb";
}

function closeDb() {
  console.log("DB is closed");
  if (_client) _client.close();
}

module.exports = {
  mongoConnect,
  getDb,
  closeDb
};
