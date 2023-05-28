import express from "express"

const {Pool} = require('pg');
 

// const pool = new Pool({
//     host : 'localhost',
//     user: 'postgres',
//     port: 5432,
//     database: 'habbit_db',
//     max : 10,
//     connectionTimeoutMillis : 0,
//     idleTimeoutMillis : 0
// });

const pool = new Pool({
    // host: 'habbit.postgres.database.azure.com',
    // user: 'habbit',
    // password: 'Baba313104',
    // database: 'habbit',
    // port: 5432,
    connectionstring: 'host=habbit.postgres.database.azure.com port=5432 dbname=habbit user=habbit password=Baba313104 sslmode=require',
    max : 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
});

pool.connect();


export {pool}