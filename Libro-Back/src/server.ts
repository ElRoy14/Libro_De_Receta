import "dotenv/config";
import express from "express";
import { connectDatabase } from "./config/database";
import { configureAuth } from "./middlewares/authorize";
import "./config/passport";
import authRoutes from "./controllers/AuthController";

const app = express();
const PORT = process.env.PORT || 3000;

configureAuth(app);
app.use(authRoutes);

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
