import express from "express"

const {Pool} = require('pg');
 

const pool = new Pool({
    host : 'localhost',
    user: 'postgres',
    //password: '9135235',
    port: 5432,
    database: 'habbit_db',
    max : 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
});

pool.connect();


export {pool}