// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
Bash
npm install @google/generative-ai
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

// Configuración de Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Ruta para procesar mensajes
app.post('/chat', async (req, res) => {
  try {
    const { mensaje Usuario } = req.body;

    // Puedes añadir un "System Prompt" para que Maya se comporte de forma específica
    const prompt = `Actúa como Maya, la asistente inteligente de PMCSE. 
                    Responde de forma profesional y técnica. 
                    Usuario dice: ${mensajeUsuario}`;

    const result = await model.generateContent(prompt);
    const respuestaIA = result.response.text();

    res.json({ respuesta: respuestaIA });
  } catch (error) {
    console.error("Error con Gemini:", error);
    res.status(500).send("Error procesando la IA");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Maya activa en puerto ${PORT}`));
res.status(500).send("Error procesando la IA");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Maya activa en puerto ${PORT}`));
