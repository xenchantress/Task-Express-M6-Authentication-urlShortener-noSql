const express = require("express");
const connectDb = require("./database");
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const passport = require('passport');
const localhost = require('passport-local').Strategy;
const localStrategy = require('./middlewares/passport');
const jwtStrategy = require(' ./middlewares/passport').jwtStrategy;
const app = express();
connectDb();

passport.use(jwtStrategy);
app.use(passport.initialize());
passport.use(new localStrategy(
  async ( username, password, done ) =>{
try{
  const user = await User.findOne({ username });

  if (!user || !user.comparePassword(password)) {
    return done(null, false, {
      message: 'Incorrect username or password'
    });
  }
return done(null, user);
  } catch (err){
    return done(err);
  }
}
));

app.use(express.json());

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

//need to test this host on postman again
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
