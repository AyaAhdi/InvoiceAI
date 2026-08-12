# 🚀 Guide d'Exécution : InvoiceAI

Ce document fournit les instructions étape par étape pour configurer, exécuter et déployer l'application **InvoiceAI**.

---

## ⚠️ CRITICAL : Informations de Configuration
| Composant | Détail |
| :--- | :--- |
| **Backend Port** | `4000` (codé en dur dans `server.js`) |
| **Frontend Port** | `5173` |
| **Backend Start** | `npm start` (exécute `nodemon server.js`) |
| **Frontend Start** | `npm run dev` |
| **Base de données** | Chaîne de connexion hardcodée dans `config/db.js` (MongoDB Atlas) |
| **Backend `.env`** | `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `GEMINI_API_KEY` |
| **Frontend `.env`** | `VITE_CLERK_PUBLISHABLE_KEY` |
| **Non requis** | 🚫 `VITE_API_URL` (frontend), 🚫 `PORT` (backend), 🚫 `MONGODB_URI` (backend) |

---

## 📋 Prérequis

Avant de commencer, assurez-vous de disposer des éléments suivants :
- 🟢 **Node.js** (v18+ recommandé)
- 📦 **npm** (inclus avec Node.js)
- 🍃 Un compte **MongoDB Atlas** ([https://www.mongodb.com/atlas](https://www.mongodb.com/atlas))
- 🔐 Un compte **Clerk** ([https://clerk.com](https://clerk.com))
- 🤖 Un compte **Google AI Studio** ([https://aistudio.google.com](https://aistudio.google.com))
- 🐙 **Git** (optionnel)

---

## 🛠️ Étapes de Configuration

### 1️⃣ Cloner ou Télécharger
Clonez le repository ou téléchargez le code source sur votre machine locale.

### 2️⃣ Configuration du Backend

```bash
cd backend
npm install
```

Créez un fichier `.env` dans le dossier `backend/` :
```env
CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_ici
CLERK_SECRET_KEY=sk_test_votre_cle_ici
GEMINI_API_KEY=votre_cle_api_gemini_ici
```

> [!IMPORTANT]
> La chaîne de connexion MongoDB est configurée dans `config/db.js`. Pour utiliser votre propre base de données, modifiez ce fichier et remplacez l'URI de connexion.

Démarrez le backend :
```bash
npm start
```
*Cela exécute `nodemon server.js` et démarre le serveur sur le port **4000**.*

### 3️⃣ Configuration du Frontend

```bash
cd frontend
npm install
```

Créez un fichier `.env` dans le dossier `frontend/` :
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_votre_cle_ici
```

Démarrez le frontend :
```bash
npm run dev
```
*L'application s'ouvrira sur http://localhost:5173.*

---

## 🔑 4️⃣ Comment Obtenir les Clés d'API

### 🍃 MongoDB Atlas
1. Allez sur mongodb.com/atlas
2. Créez un cluster gratuit **M0**
3. Créez un utilisateur de base de données (Database User) avec un *username* et un *password*
4. **Network Access** : mettez en liste blanche (whitelist) `0.0.0.0/0` pour le développement
5. Obtenez la chaîne de connexion (connection string `mongodb+srv://...`)
6. Éditez le fichier `backend/config/db.js` et remplacez l'URI.

### 🔐 Clerk
1. Allez sur clerk.com et créez un compte
2. Créez une nouvelle application
3. Choisissez vos méthodes d'authentification (email, Google, etc.)
4. Copiez la **Publishable Key** et la **Secret Key** depuis le dashboard
5. Placez les **deux clés** dans `backend/.env`
6. Placez la **Publishable Key** dans `frontend/.env` (préfixée par `VITE_`)
7. Dans le dashboard Clerk, ajoutez l'URL de redirection autorisée : `http://localhost:5173`

### 🤖 Google Gemini API
1. Allez sur aistudio.google.com
2. Cliquez sur "**Get API Key**"
3. Créez une clé d'API pour un projet
4. Copiez la clé dans `backend/.env` en tant que `GEMINI_API_KEY`
5. *Note : l'application essaie les modèles dans cet ordre : `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-2.0`*

---

## 🚀 5️⃣ Exécuter les Deux Serveurs

Ouvrez **deux terminaux** distincts :

**Terminal 1 (Backend) :**
```bash
cd backend
npm start
# Le serveur tourne sur http://localhost:4000
```

**Terminal 2 (Frontend) :**
```bash
cd frontend
npm run dev
# L'application s'ouvre sur http://localhost:5173
```

---

## 📜 6️⃣ Scripts Disponibles

### Backend
- `npm start` ➡️ Exécute `nodemon server.js` (redémarrage automatique lors des modifications)

### Frontend
- `npm run dev` ➡️ Démarre le serveur de développement Vite avec HMR
- `npm run build` ➡️ Crée le build de production dans le dossier `dist/`
- `npm run preview` ➡️ Prévisualise le build de production
- `npm run lint` ➡️ Exécute OxLint

---

## 🌍 7️⃣ Déploiement en Production

- **Frontend** : Exécutez `npm run build`, puis servez le dossier `dist/` avec Nginx ou un outil similaire.
- **Backend** : Utilisez **PM2** ou un gestionnaire de processus similaire.
- Mettez à jour l'origine **CORS** dans `server.js` (passez de `http://localhost:5173` à votre URL de production).
- Mettez à jour `config/db.js` avec votre URI MongoDB de production.
- Définissez vos clés de production **Clerk**.
- Assurez-vous que le répertoire `backend/uploads/` existe et dispose des droits d'écriture (writable).

---

## 🚑 8️⃣ Dépannage (Troubleshooting)

| Problème | Solution possible |
| :--- | :--- |
| 🛑 **Erreurs CORS** | Le CORS du backend est réglé sur `http://localhost:5173`. Vérifiez `server.js`. |
| 🔐 **Erreurs Auth** | La publishable key Clerk doit être identique entre le frontend et le backend. |
| 🍃 **MongoDB** | Vérifiez la chaîne de connexion dans `config/db.js` et votre IP whitelist. |
| 🤖 **L'IA ne marche pas** | Vérifiez la `GEMINI_API_KEY` dans `backend/.env`. |
| 📁 **Échec d'upload** | Assurez-vous que le répertoire `backend/uploads/` existe et est accessible en écriture. |
| 🔌 **Port 4000 occupé** | Changez le port codé en dur dans `server.js`. |
| ⚡ **Port 5173 occupé** | Vite choisira automatiquement le prochain port disponible. |

---

## ✅ 9️⃣ Checklist de Vérification

- [ ] Le backend démarre sans erreur sur le port `4000`
- [ ] Le frontend s'ouvre sur `http://localhost:5173`
- [ ] La page de destination (Landing page) s'affiche correctement
- [ ] Inscription/Connexion fonctionnelles via Clerk
- [ ] Le Dashboard se charge avec les cartes KPI
- [ ] Création d'une nouvelle facture possible
- [ ] Affichage de la liste des factures possible
- [ ] Prévisualisation/Impression de facture fonctionnelles
- [ ] La génération de factures par IA fonctionne
- [ ] Le profil d'entreprise (Business profile) s'enregistre correctement
- [ ] L'upload de logo/signature/tampon fonctionne
