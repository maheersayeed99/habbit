import express from "express"
require('dotenv').config()

const {Pool} = require('pg');
 

const host = process.env.host_website;
const user = process.env.database_username;
const password = process.env.database_password;
const database = process.env.database_name;

const pool = new Pool({
    
    connectionString: `postgres://${user}:${password}@${host}/${database}?sslmode=require`,
    max : 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
    
});

pool.connect()
.then(()=> {
    console.log('successful connection!')
    pool.query("SELECT * FROM daily_status;")
    .then((result) => {
        console.log(result)
    })
})
.catch((error) => {
    console.log("connection failed!");
    console.log(error.message);
});


export {pool}