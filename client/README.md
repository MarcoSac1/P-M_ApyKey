# Key Vault — Frontend (`client/`)

Interfaccia di amministrazione per la gestione di API Key (M2M).
Stack: **React 18 + Vite + React Router**. Sviluppato da **Alfio**.

## Avvio rapido

```bash
cd client
npm install
cp .env.example .env      # già in modalità mock: parte senza backend
npm run dev               # http://localhost:5173
```

In **modalità mock** (default) l'app usa un backend finto in memoria: puoi
sviluppare e mostrare tutto senza il server. Credenziali demo:

```
admin@keyvault.dev / admin123
```

Quando il backend di Ettore è pronto, in `.env`:

```
VITE_USE_MOCK=false
VITE_API_BASE_URL=/api      # il proxy di Vite inoltra a http://localhost:4000
```

## Struttura

```
client/
├── index.html
├── vite.config.js          # dev server + proxy /api -> backend :4000
├── .env.example
└── src/
    ├── main.jsx            # entry point (equivale a index.js)
    ├── App.jsx             # routing + rotte protette
    ├── index.css           # design token e stile globale
    ├── components/         # UI riutilizzabile
    │   ├── Button.jsx
    │   ├── StatusBadge.jsx
    │   ├── KeyTable.jsx
    │   ├── CreateKeyForm.jsx
    │   ├── RevealKeyModal.jsx   # ⭐ la chiave si vede una volta sola
    │   ├── ConfirmModal.jsx
    │   ├── Modal.jsx
    │   ├── Toast.jsx
    │   └── Layout.jsx
    ├── views/              # maschere principali
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   └── Keys.jsx
    ├── services/           # comunicazione col backend
    │   ├── apiClient.js    # fetch wrapper + CONTRATTO API documentato
    │   ├── authService.js
    │   ├── keyService.js
    │   └── mock/mockBackend.js   # backend finto (rispetta il contratto)
    └── context/
        └── AuthContext.jsx
```

## Contratto API atteso (da concordare con Ettore)

Il mock rispetta già questo contratto: se il backend produce le stesse
risposte, il passaggio a reale è solo un flag in `.env`.

| Metodo | Rotta                    | Body / Risposta |
|--------|--------------------------|-----------------|
| POST   | `/api/auth/login`        | `{ email, password }` → `{ token, user }` |
| GET    | `/api/keys`              | → `[{ id, name, prefix, status, permissions[], createdAt, lastUsedAt }]` |
| POST   | `/api/keys`              | `{ name, permissions[] }` → `{ ...key, secret }` — `secret` **solo qui**, una volta sola |
| POST   | `/api/keys/:id/revoke`   | → `{ id, status: "revoked" }` |

Tutte le rotte tranne il login richiedono l'header `Authorization: Bearer <token>`.

> Nota di sicurezza: il server non deve mai restituire il segreto in chiaro
> dopo la creazione (deve conservarne solo l'hash). Il frontend è costruito
> attorno a questa regola: la chiave appare una sola volta, alla creazione.
