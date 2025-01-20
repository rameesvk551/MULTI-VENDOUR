const app = require ("./app");
const connectDatabase = require("./DB/Database");

//handling uncaughExeption errors
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("shutting down the server for handling uncaugh exeption");
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

//conned db
connectDatabase()

//create server
const server = app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server  for ${err.message}`);
  console.log("shtting down the server for  unhandeled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
