import { Pool } from "pg"
import { config } from "../../config/env.js";

export const pool = new Pool({
host: config.database.host,
port: config.database.port,
database: config.database.database,
user: config.database.user,
password: config.database.password,
})

pool.on("error",(error)=>{
    console.error("Unexpected PostgreSQL pool error", error)
})