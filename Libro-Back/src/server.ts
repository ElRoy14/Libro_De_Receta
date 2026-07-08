import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Servidor Express funcionando"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciando en http://localhost:${PORT}`);
});

