const express = require("express");
const cors = require ("cors");
const mainRouter = require("./routes/index");
const userRouter = require("./routes/user");
const app = express();
const PORT= process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.use("/api/vi",mainRouter);
app.use("/api/vi/user",userRouter);
app.use("/api/vi/account",accountRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});