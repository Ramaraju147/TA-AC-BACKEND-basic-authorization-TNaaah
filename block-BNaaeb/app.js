const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const mongoStore = require("connect-mongo");
const Router = require("./routes/index");
const userRouter = require("./routes/user");
const authMiddleware = require("./middlewares/auth");
const MongoStore = require("connect-mongo");
const app = express();

let mongoClient = mongoose
  .connect(
    `mongodb+srv://pms:eU4RXiOPKD0R9Y6n@cluster0.5606btv.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((m) => {
    console.log("MongoDB connected!!");
    return m.connection.getClient();
  });

console.log("client --------------------->", mongoClient);

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "Random Secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ clientPromise: mongoClient }),
  })
);
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(flash());
app.use(authMiddleware.userInfo);
app.use("/", Router);
app.use("/users", userRouter);

app.listen("4000", () => {
  console.log("Server is listening on port 4000");
});
