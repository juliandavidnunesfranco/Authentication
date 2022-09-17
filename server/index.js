const express = require("express");
const cookieparser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const routes = require("../routes/index.js");
const server = express();

// server.name = "Authentication";

server.use(express());
server.use(express.urlencoded({ extended: true, limit: "150mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieparser());
server.use(morgan("dev"));
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
    );
    next();
});

server.use("/", routes);

module.exports = server;
