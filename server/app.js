require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConnect = require("./db/dbConnect");
const cookieParser = require('cookie-parser')

dbConnect();

const Product = require('./models/productSchema');
const Defaultdata = require('./defaultdata')
const cors = require('cors');
const router = require('./routes/router')

app.use(express.json());
app.use(cookieParser(''));
app.use(cors());
app.use(router);



let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

Defaultdata();