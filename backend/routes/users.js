const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Créer un nouvel utilisateur
router.post('/', async (req, res) => {
    try {
        // Vérifier d'abord si l'email existe déjà
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Votre adresse mail est déjà enregistrée dans nos bases, n'hésitez pas à nous appeler au  01 34 14 13 99 pour une nouvelle estimation"
            });
        }

        console.log('➡️ Tentative de création d\'un nouvel utilisateur');
        console.log('📝 Données reçues:', req.body);

        const user = new User(req.body);
        await user.save();

        console.log('✅ Utilisateur créé avec succès');
        res.status(201).json({
            success: true,
            data: user,
            message: 'Utilisateur enregistré avec succès'
        });
    } catch (error) {
        console.error('❌ Erreur lors de la création:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        console.log('➡️ Récupération de tous les utilisateurs');
        const users = await User.find().sort({ createdAt: -1 });
        
        console.log(`✅ ${users.length} utilisateurs récupérés`);
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('❌ Erreur lors de la récupération:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;