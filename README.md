# API Key Manager

Un'applicazione full-stack per la generazione, visualizzazione, verifica e revoca di API Key, progettata con particolare attenzione alla sicurezza e all'autenticazione machine-to-machine (M2M). 

Il sistema è basato su un backend in **Python** e un frontend reattivo in **JavaScript/TypeScript**.

## 🚀 Funzionalità del Progetto

### Funzionalità Minime (Core)
- **Generazione API Key:** Creazione di chiavi uniche, sicure e cifrate associate a specifiche applicazioni.
- **Lista Chiavi:** Dashboard per la visualizzazione delle chiavi attive, associate agli utenti e storiche.
- **Revoca:** Annullamento immediato della validità di una chiave in tempo reale.
- **Endpoint Protetto:** Rotte API dedicate accessibili esclusivamente previa validità dell'API Key.
- **Verifica Chiave:** Middleware di validazione e hashing in tempo reale delle richieste in ingresso.

### Funzionalità Cyber Security (Avanzate)
- Autenticazione Machine-to-Machine (M2M).
- Gestione sicura dei segreti applicativi (hashing crittografico e storage cifrato).
- Rotazione programmata e manuale delle credenziali.

---

## 👥 Organizzazione del Team e Assegnazione Task

In base alla pianificazione iniziale, lo sviluppo è così suddiviso:
- **Database & Cloud Infrastructure:** Rick (Configurazione MongoDB Atlas, gestione utenti e credenziali in Python).
- **Project Setup & Git:** Marco (Inizializzazione repository, inviti e definizione dello Scaffolding).
- **Frontend Development:** Alfio (Sviluppo delle interfacce grafiche e maschere utente in JavaScript/TypeScript).
- **API Design & Routing:** Ettore (Architettura dei flussi API e logica delle rotte con framework Python).
- **Database Connection & ORM/ODM:** Dario (Integrazione del database ed implementazione dei modelli tramite ORM/ODM Python).

---

## 📂 Scaffolding del Progetto (Struttura Directory)

Il progetto adotta un approccio a cartelle separate per **Backend (Python)** e **Frontend (Client)** all'interno della stessa repository per garantire modularità e indipendenza nello sviluppo.

```text
api-key-manager/
├── client/                  # FRONTEND (Sviluppato da Alfio)
│   ├── public/
│   └── src/
│       ├── components/      # Componenti UI riutilizzabili (pulsanti, form)
│       ├── views/           # Maschere principali (Dashboard, Login, Key Management)
│       ├── services/        # Client API per comunicare con il backend Python
│       ├── App.js
│       └── index.js
│
├── server/                  # BACKEND PYTHON (Ettore, Dario, Rick)
│   ├── app/
│   │   ├── config/          # Configurazione DB Atlas (Rick)
│   │   │   └── database.py  # Connessione gestita con PyMongo/MongoEngine
│   │   ├── controllers/     # Logica delle funzioni generali API
│   │   │   ├── auth.py      # Gestione login amministratore
│   │   │   └── keys.py      # Logica di generazione e revoca chiavi
│   │   ├── middlewares/     # Middleware di Cyber Security (Verifica API Key)
│   │   │   └── security.py
│   │   ├── models/          # Modelli ORM/ODM (Utenti, API Key) gestiti da Dario
│   │   │   ├── user.py
│   │   │   └── key.py
│   │   ├── routes/          # Definizione delle rotte API gestite da Ettore
│   │   │   ├── auth_routes.py
│   │   │   └── key_routes.py
│   │   └── main.py          # Entry point dell'applicazione (es. FastAPI / Flask)
│   ├── .env                 # File locale per le credenziali sensibili di Atlas (Rick)
│   ├── .env.example         # Template per le variabili d'ambiente di squadra
│   ├── .gitignore           # Esclusione di venv/ e file .env
│   └── requirements.txt     # Dipendenze Python del progetto
│
└── README.md                # Documentazione del progetto