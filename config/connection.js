const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "mojokerto123",
    database: "final-project-1",
    port: "5432"
})

module.exports = pool