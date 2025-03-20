import "reflect-metadata";
import app from "./app";
import { connectToDB } from "./src/utils/db";
import { connectToRedis } from "./src/redis/redisClient";
import { PORT } from "./src/utils/config";

const start = async () => {
  await connectToDB();
  await connectToRedis();
  app.listen(PORT);
}

start()
  .then(() => console.log(`Server started on PORT ${PORT}`))
  .catch(err => console.log("Server failed to start. Error: ", err));
