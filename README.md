# 🧾 InvoiceAI

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Bienvenue sur la documentation du projet **InvoiceAI**, une application moderne de gestion et de création de factures assistée par l'Intelligence Artificielle.

---

## 📸 Aperçu des Interfaces 

> *Voici un aperçu des principales fonctionnalités de la plateforme telles que présentées dans le rapport de projet.*

| Landing Page | Tableau de Bord & KPIs |
| :---: | :---: |
| ![Landing Page](docs/images/landing-page.png) | ![Dashboard](docs/images/dashboard.png) |

| Génération de Facture par IA (Gemini) | Formulaire de Création / TVA (20%) |
| :---: | :---: |
| ![AI Modal](docs/images/ai-modal.png) | ![Create Invoice](docs/images/create-invoice.png) |

| Aperçu Professionnel (PDF, ICE, Cachet) | Gestion du Profil d'Entreprise |
| :---: | :---: |
| ![Invoice Preview](docs/images/preview.png) | ![Business Profile](docs/images/business-profile.png) |

---

## 🌟 Fonctionnalités Principales

1. **Dashboard avec KPIs** : Total Invoices, Total Paid (MAD), Total Unpaid (MAD), Collection Efficiency %, Average Invoice Value.
2. **Création de factures** avec prise en charge multi-devises (MAD, EUR).
3. **Génération de factures par IA** (Google Gemini) : conversion du langage naturel vers un JSON structuré.
4. **Liste des factures** avec recherche, filtre par status, filtre de date, sorting et pagination.
5. **Invoice preview** (Aperçu) et impression au format PDF.
6. **Business profile** : gestion des uploads pour le logo, la signature et le cachet (stockés en local dans `backend/uploads/`).
7. **Authentification** sécurisée via Clerk (Modals de SignIn/SignUp).
8. **Sidebar responsive** avec fonction collapse.
9. **Landing page** incluant les sections Hero, Features et Pricing (Starter 0 MAD, Professional 499 MAD, Enterprise 1499 MAD).
10. Auto-génération des numéros de facture (Format : `INV-******-******`).
11. Support de l'**ICE** (Moroccan Tax Identification) avec une taxe par défaut de 20%.

---

## 🏗️ Architecture et Configuration

### 🔧 Informations Critiques

*   **Backend port** : `4000`
*   **Frontend port** : `5173`
*   **Backend start script** : `nodemon server.js`
*   **Backend package type** : ES modules (`"type": "module"`)
*   **Database connection** : Localisée dans `config/db.js`
*   **Database name** : `InvoiceAI` sur MongoDB Atlas
*   **CORS origin** (dans `server.js`) : `http://localhost:5173`

### 🔑 Variables d'Environnement (.env)

**Backend** (`backend/.env`) :
```env
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=...
```

**Frontend** (`frontend/.env`) :
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```
*(Aucun `VITE_API_URL` n'est requis).*

---

## 📦 Dépendances

### ⚙️ Backend
| Package | Version | Package | Version |
| :--- | :--- | :--- | :--- |
| `@clerk/express` | `^2.1.49` | `cors` | `^2.8.6` |
| `@google/genai` | `^2.16.0` | `jsonwebtoken` | `^9.0.3` |
| `express` | `^5.2.1` | `bcryptjs` | `^3.0.3` |
| `mongoose` | `^9.9.1` | `validator` | `^13.15.35` |
| `multer` | `^2.2.0` | `body-parser` | `^2.3.0` |
| `dotenv` | `^17.4.2` | `nodemon` | `^3.1.14` |

### 🎨 Frontend
| Package | Version | Package | Version |
| :--- | :--- | :--- | :--- |
| `react` | `^19.2.8` | `tailwindcss` | `^4.3.3` |
| `react-dom` | `^19.2.8` | `@tailwindcss/vite` | `^4.3.3` |
| `react-router-dom`| `^7.18.2` | `@vitejs/plugin-react`| `^6.0.4` |
| `@clerk/clerk-react`| `^5.61.9` | `vite` | `^8.2.0` |
| `@clerk/react` | `^6.12.10`| `oxlint` | `^1.75.0` |

---

## 🛣️ API Routes

### Invoices (`/api/invoice`)
*   `GET /api/invoice` : List invoices (accepte les query params `?status=&search=`)
*   `GET /api/invoice/:id` : Get invoice by ObjectId ou invoiceNumber
*   `POST /api/invoice` : Create invoice (auto-génère l'invoiceNumber `INV-******-******`)
*   `PUT /api/invoice/:id` : Update invoice
*   `DELETE /api/invoice/:id` : Delete invoice

### Business Profile (`/api/businessProfile`)
*   `GET /api/businessProfile/me` : Get authenticated user's business profile
*   `POST /api/businessProfile` : Create business profile (requête multipart avec `logoName`, `stampName`, `signatureNameMeta`)
*   `PUT /api/businessProfile/:id` : Update business profile

### AI Invoice (`/api/ai`)
*   `POST /api/ai/generate` : AI invoice generation (essaie d'abord `gemini-2.5-flash`, puis `gemini-2.0-flash`, puis `gemini-2.0`)

---

## 🗄️ Modèles de Base de Données 

### Invoice (`invoiceModel.js`)
*   **owner** : Clerk User ID (indexé, requis).
*   **invoiceNumber** : indexé, requis, auto-generated (`INV-******-******`).
*   **issueDate**, **dueDate**.
*   **fromBusinessName**, **fromEmail**, **fromAddress**, **fromPhone**, **fromIce**.
*   **client** : `{ name, email, address, phone }`.
*   **items** : `[{ id, description, qty (default:1), unitPrice (default:0) }]`.
*   **currency** (default: `'MAD'`), **status** (enum: `draft`/`unpaid`/`paid`/`overdue`, default: `'draft'`).
*   **logoDataUrl**, **stampDataUrl**, **signatureDataUrl**, **signatureName**, **signatureTitle**.
*   **taxPercent** (default: `20`), **subtotal**, **tax**, **total**.
*   *timestamps*.

### BusinessProfile (`businessProfileModel.js`)
*   **owner** : Clerk User ID (indexé, requis).
*   **businessName** (requis), **email**, **address**, **phone**.
*   **ice** (Moroccan Tax Identification / ICE).
*   **logoUrl**, **stampUrl**, **signatureUrl**.
*   **signatureOwnerName**, **signatureOwnerTitle**.
*   **defaultTaxPercent** (default: `20`).
*   *timestamps*.

---

## 🗺️ Frontend Routes

*   `/` : Landing page (Home: Navbar + Hero + Features + Pricing + Footer)
*   **Protected Routes** (`/app` - via Clerk SignedIn/SignedOut/RedirectToSignIn) :
    *   `/app` ou `/app/dashboard` : Dashboard
    *   `/app/invoices` : Invoices list
    *   `/app/invoices/new` ou `/app/create-invoice` : CreateInvoice
    *   `/app/invoices/:id` ou `/app/invoices/:id/preview` : InvoicePreview
    *   `/app/invoices/:id/edit` : CreateInvoice (edit mode)
    *   `/app/business` : BusinessProfile
*   `*` : 404 (Notfound)

---

## 📁 Structure du Projet 

```text
Facture/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── invoiceModel.js
│   │   └── businessProfileModel.js
│   ├── routes/
│   │   ├── invoiceRouter.js
│   │   ├── businessProfileRouter.js
│   │   └── aiInvoiceRouter.js
│   ├── controllers/
│   │   ├── invoiceController.js
│   │   └── businessProfileController.js
│   └── uploads/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── assets/
│       │   └── dummyStyles.js
│       ├── components/
│       │   ├── AppShell.jsx
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── Features.jsx
│       │   ├── Pricing.jsx
│       │   ├── Footer.jsx
│       │   ├── KpiCard.jsx
│       │   ├── StatusBadge.jsx
│       │   ├── InvoicePreview.jsx
│       │   ├── AiInvoiceModal.jsx
│       │   └── GeminiIcon.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Dashboard.jsx
│           ├── CreateInvoice.jsx
│           ├── Invoices.jsx
│           ├── BusinessProfile.jsx
│           └── Notfound.jsx
```

## 👤 Auteur

**Aya Ahdi**  
* GitHub : [@Aya-Ahdi](https://github.com/Aya-Ahdi)
