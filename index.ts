var express = require('express');
var app = express();
var Client = require('pg').Client;
var bodyparser = require('body-parser');
var client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "T1"
});
client.connect(function () {
    console.log('database is connected');
});
