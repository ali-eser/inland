import app from "./app";
import { PORT } from "./src/utils/config";

const start = async () => {
  app.listen(PORT);
}

start()
  .then(() => console.log(`Server started on PORT ${PORT}`));
