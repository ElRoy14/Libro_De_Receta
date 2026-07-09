import "reflect-metadata";
import "dotenv/config";
import "./config/container/index";
import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/database";
import { configureAuth } from "./middlewares/authorize";
import "./config/passport";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5174",
        credentials: true,
    })
);
app.use(express.json());
configureAuth(app);

app.get("/", (req, res) => {
    res.json({
        message: "Servidor Express funcionando"
    });
});

connectDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor iniciando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    });

export default app;