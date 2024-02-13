const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const authRouter = require("./api/auth/routes");
const path = require("path");
const morgan = require("morgan");

const app = express();

//middlewares
// app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
//app.use(localStrategy)
//my routes
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/api/auth", authRouter);
app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
connectDb();

//connect to DB

//need to test this host on postman again
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
