const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { authRoute, userRoute, movieRoute, listRoute } = require("./routes");
const { main } = require("./config/dbConnection");

main()
  .then(console.log(`connected to DB 😄`))
  .catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "token"], // Include 'token' in the allowed headers
  })
);

//middleware
app.use(express.json());
//routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(process.env.PORT_NUM, "localhost", () => {
  console.log(`Server is running on port ${process.env.PORT_NUM} 😉`);
});
