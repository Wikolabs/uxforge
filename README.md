# UXForge — Analytics UX et corrélation sessions / verbatims clients

> Voyez exactement où votre produit frustre vos utilisateurs. Liez chaque verbatim à un moment précis.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?style=flat&logo=redis)](https://redis.io)

---

## Vue d'ensemble

UXForge est une plateforme d'analytics UX qui corrèle les sessions utilisateurs (clics, scrolls, rage-clicks, exits) avec les verbatims qualitatifs (NPS, interviews, tickets support). Chaque feedback client est lié au moment exact du parcours où il s'est produit. Les équipes Produit identifient les points de friction avec preuve quantitative ET qualitative.

**Domaine :** UX Research / Product Analytics  
**Port VM :** 3024 | **Sous-domaine :** uxforge.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Heatmaps, session replay, analytics |
| Backend | FastAPI (Python 3.11), Uvicorn | API events, sessions, verbatims |
| Tracking SDK | JavaScript snippet (vanilla) | Collecte events côté client |
| Session Recording | Rrweb (DOM mutations) | Replay sessions utilisateurs |
| NLP | spaCy + sklearn | Classification verbatims, sentiment |
| Base de données | PostgreSQL 16 | Sessions, events, verbatims |
| Cache | Redis 7 | Events stream, heatmap cache |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3024) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
spacy==3.7.4
scikit-learn==1.4.2
pandas==2.2.2
numpy==1.26.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
redis==5.0.4
pydantic==2.7.1
```

---

## Architecture mono-repo

```
uxforge/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx              # Dashboard métriques UX
│   │   ├── heatmaps/             # Heatmaps clics/scroll par page
│   │   ├── sessions/             # Liste sessions + replay
│   │   ├── verbatims/            # Feedback lié aux sessions
│   │   └── funnels/              # Analyse funnels de conversion
│   └── src/components/
│       ├── HeatmapCanvas.tsx     # Heatmap overlay sur screenshot
│       ├── SessionTimeline.tsx   # Timeline events d'une session
│       ├── VerbatimCorrelation.tsx # Verbatim → session moment
│       ├── FunnelChart.tsx       # Recharts funnel drop-off
│       └── RageClickAlert.tsx    # Alertes rage-clicks détectés
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── events.py         # POST /collect (tracking events)
│   │   │   ├── sessions.py       # Sessions + replay data
│   │   │   ├── heatmaps.py       # Aggregated click/scroll data
│   │   │   └── verbatims.py      # Feedback + correlation
│   │   ├── services/
│   │   │   ├── event_processor.py# Traitement events temps réel
│   │   │   ├── heatmap_builder.py# Agrégation heatmap
│   │   │   ├── rage_click.py     # Détection rage-clicks
│   │   │   └── verbatim_tagger.py# Classification NLP
│   │   └── models/
│   │       ├── session.py
│   │       └── verbatim.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#1a1a2e', 'primaryTextColor': '#fff', 'primaryBorderColor': '#16213e', 'lineColor': '#374151', 'secondaryColor': '#f1f5f9'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3024)"]
        NEXT["Next.js 14\nUX Analytics"]
        API["FastAPI"]

        subgraph UX["🎯 UX Engine"]
            EVENTS["Event Processor\nClicks, scroll, exit"]
            HEATMAP["Heatmap Builder\nAggregation"]
            RAGE["Rage Click\nDetection"]
            NLP["spaCy NLP\nVerbatim classification"]
        end

        PG[("PostgreSQL\nSessions + Events")]
        REDIS[("Redis\nEvent stream")]
    end

    SDK["JS Tracking SDK\nUser browser"] --> API
    FEEDBACK["Verbatims\nNPS, interviews"] --> NLP
```

### Séquence — Corrélation verbatim ↔ session

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#1a1a2e', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant SDK as JS SDK
    participant API as FastAPI
    participant PROC as Event Processor
    participant RAGE as Rage Detector
    participant REDIS as Redis
    participant PM as Product Manager

    SDK->>API: POST /collect {session_id, events: [{type: click, x: 450, y: 320, timestamp}, ...]}

    API->>PROC: process_events(session_id, events)
    PROC->>RAGE: detect_rage_click(events, threshold=3_clicks_500ms)
    RAGE-->>PROC: rage_click_detected at {x: 450, y: 320, element: "#submit-btn"}

    PROC->>REDIS: PUBLISH rage_alerts {session_id, element, timestamp}
    PROC->>API: save_session_events(session_id, processed_events)

    Note over API: Le lendemain, NPS survey envoyé
    API->>API: receive_nps(user_id, score=4, comment="Le bouton ne répond pas")
    API->>API: correlate_verbatim(user_id, nps_timestamp)
    Note over API: Match: session J-1, rage_click sur #submit-btn

    API-->>PM: verbatim_with_context: {comment: "...", correlated_session: "s_xyz", rage_click_at: "#submit-btn"}
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#1a1a2e', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    SESSION {
        uuid id PK
        string user_id
        string page_url
        int duration_seconds
        boolean rage_click_detected
        int total_clicks
        float scroll_depth_pct
        timestamp started_at
    }
    EVENT {
        uuid id PK
        uuid session_id FK
        string event_type
        int x
        int y
        string element_selector
        jsonb metadata
        int timestamp_ms
    }
    VERBATIM {
        uuid id PK
        string user_id
        string source
        int nps_score
        text comment
        string sentiment
        string[] topics
        uuid correlated_session_id FK
        timestamp submitted_at
    }
    HEATMAP_AGGREGATE {
        uuid id PK
        string page_url
        jsonb click_density
        jsonb scroll_map
        int sample_size
        timestamp computed_at
    }

    SESSION ||--o{ EVENT : "contains"
    SESSION ||--o| VERBATIM : "correlated_with"
```

---

## PRD

### Problème
Les équipes Product disposent de données quantitatives (analytics) ou qualitatives (interviews, NPS) mais rarement des deux liées. Un NPS de 6 ne dit pas QUE le produit frustre, ni OÙ. Les heatmaps montrent les clics mais pas le pourquoi.

### Solution
UXForge lie automatiquement chaque verbatim qualitatif (NPS, commentaire, ticket) à la session de l'utilisateur correspondante. Le Product Manager voit "ce bouton provoque 87% des rage-clicks ET 90% des commentaires négatifs sur checkout".

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Product Manager | Prioriser les corrections avec data quanti + quali |
| UX Researcher | Corréler interviews avec comportements réels |
| Growth | Identifier les points de friction dans le funnel |

### OKRs
- Corrélation verbatim ↔ session > 80% des cas
- Détection rage-click < 1 seconde après occurrence
- Temps d'identification d'un point de friction : < 5 minutes

---

## User Stories

```
US-01 [PM] En tant que Product Manager,
      je veux voir sur quelle page et quel élément les utilisateurs clickent frénétiquement
      afin d'identifier les éléments cassés ou frustrants.

US-02 [UX Researcher] En tant que UX Researcher,
      je veux retrouver la session d'un utilisateur qui a laissé un NPS négatif
      et voir exactement son parcours avant de soumettre le feedback
      afin de comprendre le contexte exact de sa frustration.

US-03 [PM] En tant que PM,
      je veux voir la heatmap de clics sur ma page checkout
      pour identifier si les utilisateurs cliquent là où ils devraient
      afin d'améliorer le taux de conversion.

US-04 [Growth] En tant que Growth manager,
      je veux voir le funnel signup → activation avec les % de drop-off à chaque étape
      afin de prioriser les optimisations.

US-05 [PM] En tant que PM,
      je veux que les verbatims soient automatiquement tagués par thème
      (bug, UX, feature request, prix)
      afin de voir les catégories de problèmes les plus fréquentes.
```

---

## Règles métier

| # | Règle | Description | Simulable UI |
|---|-------|-------------|-------------|
| R1 | Rage-click | ≥ 3 clics sur le même élément en < 500ms | ✅ Rage click badge |
| R2 | Dead click | Clic sur élément non-interactif | ✅ Dead click map |
| R3 | Exit intent | Mouris vers coin supérieur de l'écran | ✅ Exit intent |
| R4 | Scroll depth | % de la page scrollée par session | ✅ Scroll heatmap |
| R5 | Session correlation | Verbatim ± 24h → session la plus proche liée | ✅ Correlation card |
| R6 | Verbatim NLP | Sentiment (positif/négatif/neutre) + topics (bug/UX/feature) | ✅ Tag cloud |
| R7 | Heatmap sampling | Agrégation min 100 sessions par page | ✅ Sample count |
| R8 | RGPD | Session_id anonyme, pas de PII stocké | ✅ Privacy mode |
| R9 | Replay consent | Replay uniquement si cookie consent explicite | ✅ Consent toggle |
| R10 | Funnel steps | Configuration custom des étapes du funnel | ✅ Funnel builder |

---

## Spécification API

**Base URL :** `http://uxforge.wikolabs.com/api/v1`

### POST /collect
```json
{"session_id": "s_abc", "page_url": "/checkout", "events": [{"type": "click", "x": 450, "y": 320, "element": "#pay-btn", "ts": 1710500000123}]}
// Response: {"received": 1, "rage_click_detected": false}
```

### GET /heatmaps/{page_path}
```json
// Response: {"click_density": [[x, y, weight], ...], "scroll_map": [{"depth_pct": 0.5, "pct_users": 0.72}], "sample_size": 1247}
```

### GET /verbatims?correlated=true
```json
// Response: {"verbatims": [{"comment": "Le bouton ne marche pas", "session_id": "s_xyz", "rage_click_element": "#pay-btn", "sentiment": "negative"}]}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Click Heatmap** | Overlay heatmap chaleur sur screenshot de la page |
| **Session Timeline** | Chronologie events d'une session (clics, scrolls, exits) |
| **Verbatim Card** | Feedback avec contexte session lié et rage-click identifié |
| **Funnel Chart** | Recharts funnel avec drop-off % par étape |
| **Rage Click Alert** | Badge rouge sur les éléments avec rage-clicks > seuil |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: uxforge, POSTGRES_USER: ux_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://ux_user:${POSTGRES_PASSWORD}@postgres/uxforge
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    expose: ["8000"]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3024:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Tracking SDK JavaScript
- [ ] Heatmaps clics/scroll
- [ ] Dashboard métriques UX

### Phase 2 — Corrélation
- [ ] Session replay (rrweb)
- [ ] Verbatim NLP classification
- [ ] Corrélation feedback ↔ session

### Phase 3 — Intelligence
- [ ] Rage-click prediction (avant que l'utilisateur ne parte)
- [ ] A/B test intégré
- [ ] Intégration PulseScope (NPS + heatmap combiné)

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
