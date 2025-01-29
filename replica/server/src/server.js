const express = require('express');
const cors = require('cors');
const routerEnvioDeDatos = require('./routes/EnvioDeDatosUsuario');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routerEnvioDeDatos);

app.use("/", (req, res) => {
    res.json({ pepito: "holas" });
});

app.use((req, res) => {
    console.log('Ruta invalida 404');
    res.status(404).json({ message: 'capo no existe es url' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
