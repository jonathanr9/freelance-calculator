# Portfolio Manager

Une application React pour la gestion de portefeuille d'investissement permettant de suivre et comparer les allocations cibles et actuelles.

## Structure du projet

```
src/
  ├── components/
  │   ├── PortfolioManager/
  │   │   ├── index.jsx            # Composant principal gérant l'état global
  │   │   ├── ProgressBar.jsx      # Barre de progression des étapes
  │   │   ├── Step1_Target.jsx     # Formulaire de définition du portefeuille cible
  │   │   ├── Step2_Current.jsx    # Formulaire de saisie du portefeuille actuel
  │   │   ├── Step3_Situation.jsx  # Tableau et graphique de la situation
  │   │   └── utils/
  │   │       ├── constants.js     # Prix mockés et couleurs
  │   │       └── calculations.js  # Fonctions de calcul
  └── App.jsx                      # Point d'entrée de l'application
```

## Description des composants

### PortfolioManager/index.jsx
- Composant principal qui gère l'état global
- Coordonne les différentes étapes du processus
- Gère la navigation entre les étapes

### ProgressBar.jsx
- Affiche la progression à travers les étapes
- Indique visuellement l'étape actuelle

### Step1_Target.jsx
- Permet de définir les familles d'investissement
- Gère les poids cibles pour chaque famille
- Affiche le total des allocations

### Step2_Current.jsx
- Gère la saisie du solde espèces
- Permet d'ajouter des ETFs aux familles
- Affiche un tableau récapitulatif des ETFs ajoutés

### Step3_Situation.jsx
- Affiche un tableau comparatif des allocations
- Présente un graphique de la répartition actuelle
- Propose des actions à entreprendre

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd portfolio-manager
```

2. Installer les dépendances :
```bash
npm install
```

### Dépendances principales
```bash
npm install react react-dom            # Base React
npm install @vitejs/plugin-react       # Plugin Vite pour React
npm install tailwindcss autoprefixer   # Tailwind CSS
npm install recharts                   # Graphiques
npm install lucide-react              # Icônes
```

### Configuration de Tailwind
```bash
npx tailwindcss init -p
```

## Développement

Pour lancer le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse : http://localhost:5173

## Build et Déploiement

1. Créer une version de production :
```bash
npm run build
```
Cette commande créera un dossier `dist` contenant l'application optimisée.

2. Tester la version de production localement :
```bash
npm install -g serve
serve -s dist
```
L'application sera accessible à l'adresse : http://localhost:3000

3. Déploiement sur un serveur :
- Copier le contenu du dossier `dist` sur votre serveur
- Configurer votre serveur web (Apache/Nginx) pour servir le contenu statique
- S'assurer que toutes les routes redirigent vers index.html pour le routage côté client

### Configuration Apache exemple
```apache
<VirtualHost *:80>
    ServerName votre-domaine.com
    DocumentRoot /chemin/vers/dist

    <Directory "/chemin/vers/dist">
        RewriteEngine on
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### Configuration Nginx exemple
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    root /chemin/vers/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Variables d'environnement
Créer un fichier `.env` à la racine du projet :
```env
VITE_API_URL=votre_url_api
```

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Crée une version de production
- `npm run preview` : Preview de la version de production
- `npm run lint` : Lance le linter
- `serve -s dist` : Sert la version de production localement

## Notes
- L'application utilise des données mockées pour les prix des ETFs (configurables dans `utils/constants.js`)
- Les calculs de poids et de valeurs sont effectués côté client
- Le design est responsive et optimisé pour mobile

## Support
Pour toute question ou problème, vous pouvez :
1. Ouvrir une issue sur GitHub
2. Contacter l'équipe de développement