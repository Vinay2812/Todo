import express from "express";
import AuthRoute from "./routes/AuthRoute.js";
import connection from "./dbConnect.js";
const app = express();
const port = process.env.PORT
app.use(express.json());

app.use("/auth", AuthRoute);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})