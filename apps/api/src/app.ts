import fastify from "fastify";
import { pool } from "./infrastructure/database/pool.js";

export function buildApp(){
    const app = fastify({
        logger: true,
    })


app.get("/api/v1/health", async(_request, reply) =>{
    try{
        const result = await pool.query("SELECT NOW()");

        return reply.send({
            status: "ok",
            database: "connected",
            postgresTime: result.rows[0].now,
        })
    }catch (error) {
        app.log.error(error, "Database connection failed");

        return reply.status(503).send({
            status:"error",
            database:"unavailable",
        });
    }
})

return app;
}