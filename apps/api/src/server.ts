import { buildApp } from "./app.js";
import { pool } from "./infrastructure/database/pool.js";

const app = buildApp();

const start = async () =>{
try{
    await app.listen({
        host:"127.0.0.1",
        port: 3000,
    })
} catch(error){
    app.log.error(error);
    process.exit(1)
}
}

const shutdown = async (signal: string) => {
    app.log.info( `Received ${signal}. Starting graceful shutdown ...`);

    try {
        await app.close();
        app.log.info("Fastify server closed");

        await pool.end();
        app.log.info("PostgreSQL pool closed")

        process.exit(0);
    } catch(error){
        app.log.error(error, "Error during graceful shutdown")
        process.exit(1);
    }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM",shutdown);

await start()