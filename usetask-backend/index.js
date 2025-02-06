require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
connectDB();

app.get("/", (req, res) => {
    res.send("Servidor funcionando...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
