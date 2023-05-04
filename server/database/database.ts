import express from "express"

const {Pool} = require('pg');
 

const pool = new Pool({
    "host": "localhost",
    "user": "postgres",
    "port": 4000,
    "password": "password",
    "database": "habbit",
    "max" : 10,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis" : 0
})

pool.connect();