// import { connect, connection } from "mongoose";
// import { MONGODB_URI } from "./config";

// export async function connectToMongodb() {
//   try {
//     await connect(MONGODB_URI);
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

// connection.on("connected", () => {
//   console.log("Mongodb connected to:", connection.db.databaseName);
// });

// connection.on("error", (error) => {
//   console.error("error", error);
// });

// connection.on("disconnected", () => {
//   console.log("Mongodb disconnected");
// });



import mysql from "mysql";
import { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } from "./config";

let dbConnection: mysql.Connection | null = null;

export function connectToMySQL() {
  dbConnection = mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  });

  dbConnection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err.message);
      return;
    }
    console.log("Connected to MySQL database:", MYSQL_DATABASE);
  });

  dbConnection.on("error", (err) => {
    console.error("MySQL error:", err.message);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Attempting to reconnect to MySQL...");
      connectToMySQL();
    } else {
      throw err;
    }
  });
}

export function getMySQLConnection(): mysql.Connection {
  if (!dbConnection) {
    throw new Error("MySQL connection not established");
  }
  return dbConnection;
}
