import express from "express";
import cors from "cors";
import morgan from "morgan";
import {config} from "dotenv";
import {createTables} from "./database/create-tables.js";
import {getConnection} from "./database/mysql.js";
import customersRoute from "./routes/customers-route.js";
import usersRoute from "./routes/users-route.js";

config();

const main = async () => {
  try {

      const PORT = process.env.PORT || 3000;
      
      console.log({PORT})
      
      const app = express();
      app.use(express.json());
      app.use(cors());
      app.use(morgan("dev"));
      
      console.log("Mysql connecting...");
      
      const connection = await getConnection();
      app.connection = connection;
      
      console.log("Mysql connected successfull");
      
      await createTables(connection);

      app.use("/users", usersRoute);
      app.use("/customers", customersRoute);
      
      app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
      
      process.on("exit", async () => {
          connection.end();
      });
      
  } catch (error) {
      console.error(error);  
  }
};

main();
