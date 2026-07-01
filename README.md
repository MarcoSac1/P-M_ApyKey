```
api-key-manager/
├── client/                  # FRONTEND (Assegnato ad Alfio)
│   ├── public/
│   └── src/
│       ├── components/      # Componenti UI (bottoni, tabelle, form)
│       ├── views/           # Maschere FE (Dashboard, Vista Chiavi, Login)
│       ├── services/        # Chiamate API verso il backend
│       ├── App.js
│       └── index.js
│
├── server/                  # BACKEND (Assegnato a Ettore, Dario, Rick)
│   ├── config/              # Configurazione DB Atlas e variabili d'ambiente (Rick)
│   │   └── db.js            # Connessione al database
│   ├── controllers/         # FUNZ. GEN. API (Logica di business)
│   │   ├── keyController.js # Generazione, revoca e lista chiavi
│   │   └── authController.js# Autenticazione admin
│   ├── middleware/          # CYBER SECURITY (Verifica chiave su rotte protette)
│   │   └── keyValidator.js  # Middleware di controllo API Key
│   ├── models/              # ORM / ODM (Assegnato a Dario)
│   │   ├── User.js          # Modello Utente/Admin
│   │   └── ApiKey.js        # Modello della API Key (ID, hash, permessi, stato)
│   ├── routes/              # ROUTE API (Assegnato ad Ettore)
│   │   ├── authRoutes.js    # Rotte di login amministratore
│   │   └── keyRoutes.js     # Rotte per creare/vedere/revocare chiavi
│   ├── utils/               # Funzioni di utilità (es. crittografia/generazione stringhe)
│   │   └── cryptoHelper.js
│   ├── .env.example         # File di esempio per le credenziali Atlas
│   ├── package.json
│   └── server.js            # Entry point dell'applicazione backend
│
└── README.md                # Documentazione generale del progetto

Un'applicazione full-stack per la generazione, visualizzazione, verifica e revoca di API Key, progettata con particolare attenzione alla sicurezza e all'autenticazione machine-to-machine (M2M).

## 🚀 Funzionalità del Progetto

### Funzionalità Minime (Core)
- **Generazione API Key:** Creazione di chiavi uniche e sicure associate a specifiche applicazioni.
- **Lista Chiavi:** Visualizzazione della dashboard delle chiavi attive e storiche.
- **Revoca:** Annullamento immediato della validità di una chiave.
- **Endpoint Protetto:** Rotte API accessibili esclusivamente previa validità dell'API Key.
- **Verifica Chiave:** Middleware di validazione in tempo reale delle richieste in ingresso.

### Funzionalità Cyber Security (Avanzate)
- Autenticazione Machine-to-Machine (M2M).
- Gestione sicura dei segreti applicativi (hashing e storage cifrato).
- Rotazione programmata e manuale delle credenziali.

---

## 👥 Organizzazione del Team e Assegnazione Task

In base alla pianificazione iniziale, lo sviluppo è così suddiviso:
- **Database & Cloud Infrastructure:** Rick (Configurazione MongoDB Atlas, gestione utenti e credenziali).
- **Project Setup & Git:** Marco (Inizializzazione repository, inviti e definizione dello Scaffolding).
- **Frontend Development:** Alfio (Sviluppo delle interfacce grafiche e maschere utente).
- **API Design & Routing:** Ettore (Architettura dei flussi API e logica delle rotte).
- **Database Connection & ORM/ODM:** Dario (Integrazione del database ed implementazione dei modelli tramite ORM).

---

## 📂 Scaffolding del Progetto (Struttura Directory)

Il progetto adotta un approccio a cartelle separate per **Backend (Server)** e **Frontend (Client)** all'interno della stessa repository per garantire modularità e pulizia.

```text
api-key-manager/
├── client/                  # Frontend (Sviluppato da Alfio)
│   ├── public/
│   └── src/
│       ├── components/      # Componenti UI riutilizzabili
│       ├── views/           # Maschere principali (Dashboard, Login, Key Management)
│       ├── services/        # Client API per comunicare con il backend
│       ├── utils/           # Funzioni helper
│       ├── App.js
│       └── index.js
│
├── server/                  # Backend (Sviluppato da Ettore, Dario, Rick)
│   ├── config/              # Configurazione DB Atlas e variabili d'ambiente
│   │   └── db.js            # Connessione gestita da Dario / Rick
│   ├── controllers/         # Logica delle funzioni generali API
│   │   ├── authController.js
│   │   └── keyController.js
│   ├── middleware/          # Middleware di Cyber Security e Verifica API Key
│   │   └── authMiddleware.js
│   ├── models/              # Modelli ORM/ODM (Utenti, API Key) gestiti da Dario
│   │   ├── Key.js
│   │   └── User.js
│   ├── routes/              # Definizione delle rotte API gestite da Ettore
│   │   ├── authRoutes.js
│   │   └── keyRoutes.js
│   ├── utils/               # Generatori di chiavi crittografiche e hashing
│   │   └── crypto.js
│   ├── .env.example         # Template per le variabili d'ambiente (M2M, Atlas URI)
│   ├── package.json
│   └── server.js            # Entry point dell'applicazione
│
└── README.md                # Documentazione del progetto
```

---

## 🛠️ Stack Tecnologico Consigliato

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (NoSQL) con Mongoose (ODM)
- **Frontend:** React.js o Vue.js (per la gestione reattiva delle maschere)
- **Sicurezza:** `crypto` (nativo Node) o `bcrypt` per l'hashing dei segreti applicativi

---

## ⚙️ Installazione e Configurazione

1. **Clonare la repository:**
   ```bash
   git clone <url-repository>
   cd api-key-manager
   ```

2. **Configurazione Backend:**
   ```bash
   cd server
   npm install
   ```
   Creare un file `.env` basandosi su `.env.example` e inserire la stringa di connessione di MongoDB Atlas fornita da Rick.

3. **Configurazione Frontend:**
   ```bash
   cd ../client
   npm install
   ```

4. **Avvio in modalità sviluppo:**
   - Server: `npm run dev` (dentro la cartella server)
   - Client: `npm start` (dentro la cartella client)