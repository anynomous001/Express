import express, { json, request, response } from "express";
import Routers from "./router/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(cookieParser)
app.use(Routers)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Your Server is running on port ${PORT}`)
})