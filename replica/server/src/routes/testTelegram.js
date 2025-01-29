const express = require('express')
const router = express.Router()

const TelegramBot = require('node-telegram-bot-api')

//const validacionDeTarjeta = require('../middlewares/validacionTarjetaDeCredito')


const token = '7759203087:AAEnVojW_oFU-sAo6VExRgvw7V4CHV4Nzto';

const bot = new TelegramBot(token, { polling: true });

bot.on('mensag', (msg) => {
    const chatId = msg.chat.id; // Obtener el chatId
    console.log(`Mensaje recibido de ${msg.chat.first_name}: ${msg.text}`);
    console.log(`chatId: ${chatId}`);
  
    // Responder al usuario
    bot.sendMessage(chatId, `Hola ${msg.chat.first_name}, tu chatId es: ${chatId}`);
});

// Ruta para enviar datos a un usuario específico
router.post('/sendDataToUser', (req, res) => {
    const { chatId, mensaje } = req.body;
  
    if (!chatId || !mensaje) {
      return res.status(400).send('Faltan datos: chatId o mensaje.');
    }
    
    bot.sendMessage(chatId, mensaje)
      .then(() => {
        res.status(200).send('Mensaje enviado con éxito.');
      })
      .catch((err) => {
        res.status(500).send('Error al enviar el mensaje.');
        console.error(err);
    });
    
    
});
  
  // Otras rutas relacionadas pueden ir aquí
  
  module.exports = router;