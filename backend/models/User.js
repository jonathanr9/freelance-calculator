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
        unique: true,
        index: true
    },
    phone: String,
    dailyRate: {
        type: Number,
        required: [true, 'Le taux journalier est requis']
    },
    daysPerMonth: {
        type: Number,
        required: [true, 'Le nombre de jours est requis']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware pour intercepter les erreurs de duplicate
userSchema.post('save', function(error, doc, next) {
    if (error.code === 11000 && error.keyPattern.email) {
        next(new Error("Votre adresse mail est déjà enregistrée dans nos bases, n'hésitez pas à nous appeler au  01 34 14 13 99 pour une nouvelle estimation"));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);