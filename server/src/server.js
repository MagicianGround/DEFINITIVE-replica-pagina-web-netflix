const express = require('express');
const cors = require('cors');

const EvioDeDatos = require('./routes/EnvioDeDatosUsuari')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api', EvioDeDatos)

app.use('/', (req, res) => {
    res.send('Bienvenido al Backend de REEPLICA PAGINA')
})

app.use((req, res) => {
    console.log('Ruta Invalida 404')
    res.status(404).json({  message : 'URL invalida'  })
})

app.listen(PORT, ()=> {
    console.log(`aplicacion Corriendo en ${PORT}`);
});