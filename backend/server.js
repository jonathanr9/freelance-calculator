const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const os = require('os');  // Module intégré Node.js

dotenv.config();
const app = express();

// Fonction pour obtenir l'IP locale
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Chercher l'IPv4, non-interne
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

// Configuration CORS
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log('✅ Connecté à MongoDB Atlas');
})
.catch(err => {
    console.error('❌ Erreur de connexion MongoDB:', err);
});

// Routes
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    const localIP = getLocalIP();
    console.log('--------------------');
    console.log(`🚀 Serveur démarré`);
    console.log(`📡 Écoute sur toutes les interfaces (${HOST}:${PORT})`);
    console.log(`🏠 Local: http://localhost:${PORT}`);
    console.log(`🌐 Réseau: http://${localIP}:${PORT}`);
    console.log('--------------------');
});