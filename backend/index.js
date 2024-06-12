const express = require("express");

const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");
const app = express();

app.use("/api/vi",mainRouter);
app.use("/api/vi/user",userRouter);
app.use("/api/vi/account",accountRouter);