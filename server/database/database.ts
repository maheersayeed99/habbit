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

    // connectionString: 'host=habbit.postgres.database.azure.com port=5432 dbname=habbit user=habbit password=Baba313104 sslmode=require',
    connectionString: 'postgres://habbit:Baba313104@habbit.postgres.database.azure.com/postgres?sslmode=require',
    database: 'habbit_db',
    port: 5432,
    max : 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
});

pool.connect();


export {pool}