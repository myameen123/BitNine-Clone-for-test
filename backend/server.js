const app = require("./app");
const dotenv = require("dotenv");
const connectDatabse = require("./utils/databaseConnection");
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to UnCaught Exception");
  process.exit(1);
});

//config
dotenv.config();

const port = process.env.PORT || 5000;

//databse Connection
connectDatabse();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
