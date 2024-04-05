import { Applicaction } from "./app";
import { connectToMysql } from "./database"; // Import the MySQL connection function

async function main() {
  await connectToMysql(); // Call the MySQL connection function
  const app = new Applicaction();
  app.start();
}

main();
