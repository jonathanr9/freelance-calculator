#!/bin/bash

# Création de la structure des dossiers
echo "Création de la structure des dossiers..."
mkdir -p backend/{models,routes}

# Création du fichier .env
echo "Création du fichier .env..."
cat > backend/.env << EOL
PORT=5000
MONGODB_URI=votre_uri_mongodb_atlas
EOL

# Création du fichier server.js
echo "Création du fichier server.js..."
cat > backend/server.js << EOL
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch(err => console.error('Erreur de connexion MongoDB:', err));

// Routes
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Serveur démarré sur le port \${PORT}\`);
});
EOL

# Création du modèle User
echo "Création du modèle User..."
cat > backend/models/User.js << EOL
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis']
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true
  },
  phone: String,
  dailyRate: {
    type: Number,
    required: [true, 'Le taux journalier est requis']
  },
  daysPerMonth: {
    type: Number,
    required: [true, 'Le nombre de jours par mois est requis']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
EOL

# Création des routes
echo "Création des routes..."
cat > backend/routes/users.js << EOL
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      data: user,
      message: 'Utilisateur enregistré avec succès'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
EOL

# Création de .gitignore
echo "Création du fichier .gitignore..."
cat > backend/.gitignore << EOL
node_modules/
.env
EOL

# Installation des dépendances
echo "Installation des dépendances..."
cd backend
npm init -y

# Modification du package.json pour ajouter le script de démarrage
sed -i '/"scripts": {/a \    "start": "node server.js",' package.json

npm install express mongoose dotenv cors

echo "Configuration terminée !"
echo "Pour démarrer le serveur, exécutez : cd backend && npm start"
echo "N'oubliez pas de remplacer 'votre_uri_mongodb_atlas' dans le fichier .env par votre URI MongoDB Atlas"