const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/login', async (req, res) => {
    try {
        // Lanzar el navegador
        const browser = await puppeteer.launch({ headless: true }); // 'true' para ocultar el navegador
        const page = await browser.newPage();

        // Navegar a la página de inicio de sesión de Netflix
        await page.goto('https://www.netflix.com/login');

        // Esperar a que los campos estén disponibles
        await page.waitForSelector('[name="userLoginId"]');
        await page.waitForSelector('[name="password"]');

        // Obtener credenciales desde la URL (query params)
        const { email, password } = req.query; // Ejemplo: /enviar?email=usuario@gmail.com&password=clave123

        if (!email || !password) {
            return res.status(400).json({ error: "Faltan email o contraseña" });
        }

        // Completar los campos del formulario
        await page.type('[name="userLoginId"]', email);
        await page.type('[name="password"]', password);

        // Hacer clic en el botón de enviar
        await page.click('[data-uia="login-submit-button"]');

        // Esperar hasta 3 segundos para detectar si hay un error
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Verificar si hay mensaje de error
        const errorMessage = await page.$('[data-uia="error-message-container"]');

        // Cerrar el navegador
        await browser.close();

        if (errorMessage) {
            return res.json({ success: false, message: "❌ Credenciales inválidas" });
        } else {
            return res.json({ success: true, message: "✅ Inicio de sesión exitoso" });
        }
    } catch (error) {
        console.error("Error en la automatización:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;