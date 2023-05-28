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

const host = 'habbit.postgres.database.azure.com';
const user = 'habbit';
const password = 'Baba313104';
const database = 'habbit_db'

const pool = new Pool({
    // host: 'habbit.postgres.database.azure.com',
    // user: 'habbit',
    // password: 'Baba313104',
    // database: 'habbit',
    // port: 5432,

    // connectionString: 'host=habbit.postgres.database.azure.com port=5432 dbname=habbit user=habbit password=Baba313104 sslmode=require',
    // connectionString: 'host=habbit.postgres.database.azure.com port=5432 dbname=habbit_db user=habbit password=Baba313104 sslmode=require',
    // host: 'habbit.postgres.database.azure.com',
    // database: 'habbit_db',
    // user: 'habbit',
    // password: 'Baba313104',
    // port: 5432,
    connectionString: `postgres://${user}:${password}@${host}/${database}?sslmode=require`,
    max : 10,
    connectionTimeoutMillis : 0,
    idleTimeoutMillis : 0
    // return `postgres://${this.user}habbit:Baba313104@habbit.postgres.database.azure.com/habbit_db?sslmode=require`
    
    
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