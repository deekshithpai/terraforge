import "dotenv/config";

const requiredEnv =[
    "DB_HOST",
    "DB_PORT",
    "DB_DATABASE",
    "DB_USER",
    "DB_PASSWORD",
] as const;

for(const key of requiredEnv){
    if(!process.env[key]) {
        throw new Error(`Missing required environment variable :${key}`);
    }
}


const port = Number(process.env.DB_PORT);

if(!Number.isInteger(port) || port <= 0){
    throw new Error("DB_PORT must be a valid positive integer")
}

export const config ={
    database: {
        host: process.env.DB_HOST,
        port,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}