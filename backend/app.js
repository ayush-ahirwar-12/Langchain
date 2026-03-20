import express from "express"
import cookies from "cookie-parser";
import authRouter from "./src/routes/user.route.js"












const app = express();
app.use(express.json());
app.use(cookies());

app.use("/api/auth",authRouter);








export default app;