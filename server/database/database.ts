import express from "express"
require('dotenv').config()

const {Pool} = require('pg');
 

// const host = process.env.host_website;
// const user = process.env.database_username;
// const password = process.env.database_password;
// const database = process.env.database_name;
const connectionString = process.env.database_connection_string;

const pool = new Pool({

    connectionString: connectionString,
    max : 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
    
});

pool.connect()
.then(()=> {
    console.log('successful connection!')
    return pool.query("SELECT * FROM daily_status ORDER BY timestamp ASC LIMIT 1;");
})
.then((result) => {
    console.log(result.rows)
})
.catch((error) => {
    console.log("connection failed!");
    console.log(error.message);
});


export {pool}