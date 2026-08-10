import fastify from "fastify";

export function buildApp(){
    const app = fastify({
        logger: true,
    })


app.get("/api/v1/health", async() =>{
    return{
        status:"ok",
    }
})

return app;
}