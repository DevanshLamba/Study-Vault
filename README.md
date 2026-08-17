# STUDY VAULT

### Personal technical intelligence system — Devansh Lamba

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20Study%20Vault-111827?style=for-the-badge)](https://study-vault-pied.vercel.app)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

> A structured record of what I learn, what I build, and the evidence behind both.

## Live Demo

### [Open Study Vault →](https://study-vault-pied.vercel.app)

## Overview

Study Vault is my personal technical knowledge system. It turns scattered learning, projects, notes, and repositories into a clear trail of technical work.

Rather than listing technologies without context, the system connects the subject, the concepts explored, and the code or project that demonstrates them.

```text
LEARN  →  BUILD  →  DOCUMENT  →  KEEP THE EVIDENCE
```

It is built as a living system: new subjects, topics, and evidence can be added as the work evolves.

## How It Works

```text
Brand Intro
     ↓
Subject Selection
     ↓
Circular Subject Navigation
     ↓
Subject Dashboard
     ↓
Topic Directory
     ↓
GitHub / Project Evidence
```

The goal is simple: move quickly from a high-level skill area to the work behind it.

## Current Focus Areas

| Area | Selected topics |
|---|---|
| **Agentic AI** | Agent fundamentals, tool and function calling, MCP, RAG agents, memory, orchestration, multi-agent systems |
| **Generative AI** | LLMs, prompt engineering, embeddings, vector databases, RAG, AI application architecture |
| **Web Development** | JavaScript, React, Node.js, REST APIs, authentication, databases, deployment |
| **Data Structures & Algorithms** | Arrays, hashing, linked lists, trees, graphs, algorithms, complexity analysis |

## Key Features

- **Data-driven content** — subjects and topics are structured data, not UI-specific hardcoding.
- **Circular subject navigation** — an interactive, product-style alternative to a static card grid.
- **Topic-level evidence** — learning areas can point to the related repository, implementation, or project.
- **Reusable React components** — a shared interface system supports each subject without duplicating UI logic.
- **Responsive design** — layouts adapt across desktop, tablet, and mobile screens.
- **GitHub as the evidence layer** — Study Vault organizes the work; GitHub contains the implementation trail.

## Architecture

```text
src/
├── components/
│   ├── BrandIntro.jsx
│   ├── CardStage.jsx
│   ├── SubjectCard.jsx
│   └── Dashboard.jsx
├── data/
│   └── subjects.js
├── hooks/
│   └── useCardAnimation.js
├── App.jsx
├── main.jsx
└── index.css
```

```text
subjects.js → Subject Cards → Dashboard → Topics → GitHub Evidence
```

Keeping content separate from presentation makes the system easier to extend without rebuilding the experience.

## Design Direction

The interface takes cues from a personal R&D console: focused, precise, and understated rather than overloaded.

- Cool-white and blue-gray surfaces
- Restrained warm-gold accents
- Layered card depth and deliberate motion
- Editorial typography with minimal HUD-inspired detail
- Clear hierarchy over visual noise

The intent is not to imitate a fictional interface; it is to make technical progress feel tangible and organized.

## Tech Stack

| Technology | Role |
|---|---|
| React.js | UI architecture |
| JavaScript | Application logic |
| Vite | Development and build tooling |
| CSS | Styling, animation, and responsive design |
| Git & GitHub | Version control and implementation evidence |
| Vercel | Deployment |

## Roadmap

- More topic-to-repository mappings
- Search across the vault
- Detailed learning history and progress analytics
- Additional subjects and project evidence
- AI-assisted doubt resolution

## Developer

**Devansh Lamba** — Computer Engineering

Building across **AI, backend engineering, automation, full-stack development, and DSA**.

- GitHub — [@devanshlamba](https://github.com/devanshlamba)
- LinkedIn — [Devansh Lamba](https://www.linkedin.com/in/devanshlamba)
- Instagram — [@dvnshlamba](https://instagram.com/dvnshlamba)

## Status

**Active development.** Study Vault evolves alongside my technical learning and projects.

---

Built by Devansh Lamba — **designed to keep the work visible.**
