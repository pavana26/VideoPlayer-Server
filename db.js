const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "VideoUpload",
    password: "Passw0rd",
    port: 5432,
})

module.exports = pool;