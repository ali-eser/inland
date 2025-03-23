import Redis from "ioredis";
import { REDIS_URL, REDIS_PORT } from "../utils/config";

const port: number = REDIS_PORT ? parseInt(REDIS_PORT) : 6379;
const url: string = REDIS_URL ? REDIS_URL : "127.0.0.1";

export const redisClient = new Redis(port, url);

export const connectToRedis =  async () => {
  try {
    console.log("Connecting to Redis");
    await redisClient.ping();
    console.log(`Connected to Redis at ${url}:${port}`);
  } catch (err) {
    console.error("Redis connection error: ", err);
    process.exit(1);
  }
};
