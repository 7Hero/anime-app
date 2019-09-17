const express = require("express");
const cors = require("cors");
const { mongoConnect, getDb } = require("./util/database");
const uri = process.env.ATLAS_URI;
var cloudscraper = require('cloudscraper');
var AnimeUtils = require('anime-scraper').AnimeUtils;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/find/:name", async (req, res) => {
  const { name } = req.params;
  const db = getDb();
  console.log(db);
  const data = await db
    .collection("anime")
    .find({ "attributes.canonicalTitle": { $regex: name, $options: "i" } })

    .toArray();
  // const data = await db.collection("anime").findOne({});
  const response = {
    video: data.slice(0, 4),
    cnt: data.length
  };
  res.json(response);
});
app.get("/homepage", async (req, res) => {
  const db = getDb()
  db.collection("animeFrontpage")
  .find()
  .toArray( (err,result) =>{
    res.json(result);
  })
  console.log(`O intrat un patan de pe IP-ul - ${req.connection.remoteAddress}`);
});
app.get("/ongoing-animes",async (req,res)=> {
  const db = getDb()
  db.collection("ongoingAnimes").find().toArray((err,result)=>{
    res.json(result)
  })
})
app.get("/popular",async (req,res)=> {
  const db = getDb()
  db.collection("popular").find().toArray((err,result)=>{
    res.json(result)
  })
})
mongoConnect(() =>
  app.listen(process.env.PORT, "0.0.0.0", () =>
    console.log("Server start on port:" + process.env.PORT)
  )
);
