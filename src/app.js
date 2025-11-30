import express from "express";
import pm2Routes from "./routes/pm2.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errHandler } from "./middleware/errHandle.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("berjalan wak!");
});

app.use("/auth", authRoutes);
app.use("/pm2", pm2Routes);
app.use(errHandler);

export default app;
