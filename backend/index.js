const express = require("express");
const cors = require ("cors");
const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");
const accountRouter = require("./routes/account")
require("dotenv").config();
const app = express();
const PORT= process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use("/api/v1",mainRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/account",accountRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});