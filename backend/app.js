const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const user = require("../backend/routers/userRoutes");
const home = require('../backend/routers/homeRoutes')
app.use("/api/v1/", user);
app.use('/api/v1/home',home)

module.exports = app;
