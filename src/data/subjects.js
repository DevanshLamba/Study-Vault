// ============================================================
// subjects.js — Single source of truth for all subject data.
//
// To add a new subject: add one object to this array.
// To update a GitHub URL: change the `repo` or a topic's `github`.
// No other file needs to change.
//
// PLACEHOLDER URLs follow the pattern:
//   https://github.com/devansh-lamba/Study-Vault/tree/main/<Subject>/<Topic>
// Replace with real URLs once the repository is set up.
// ============================================================

const BASE = 'https://github.com/devansh-lamba/Study-Vault/tree/main';

export const subjects = [
  // ─────────────────────────────────────────────────────────
  // 1. AGENTIC AI
  // ─────────────────────────────────────────────────────────
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    fullName: 'Agentic Artificial Intelligence',
    description:
      'AI agents, autonomous tool use, multi-agent orchestration, memory, RAG agents, and production deployment of agentic systems.',
    icon: '⬡',
    accentColor: '#7c6fce',
    progress: 0,
    repo: `${BASE}/Agentic-AI`,
    topics: [
      { name: 'Agent Fundamentals',    github: `${BASE}/Agentic-AI/Agent-Fundamentals` },
      { name: 'Tools & Tool Calling',  github: `${BASE}/Agentic-AI/Tools-and-Tool-Calling` },
      { name: 'Function Calling',      github: `${BASE}/Agentic-AI/Function-Calling` },
      { name: 'MCP',                   github: `${BASE}/Agentic-AI/MCP` },
      { name: 'Agent Workflows',       github: `${BASE}/Agentic-AI/Agent-Workflows` },
      { name: 'Memory',                github: `${BASE}/Agentic-AI/Memory` },
      { name: 'RAG Agents',            github: `${BASE}/Agentic-AI/RAG-Agents` },
      { name: 'Multi-Agent Systems',   github: `${BASE}/Agentic-AI/Multi-Agent-Systems` },
      { name: 'Agent Evaluation',      github: `${BASE}/Agentic-AI/Agent-Evaluation` },
      { name: 'Agent Deployment',      github: `${BASE}/Agentic-AI/Agent-Deployment` },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 2. GENERATIVE AI
  // ─────────────────────────────────────────────────────────
  {
    id: 'generative-ai',
    name: 'Generative AI',
    fullName: 'Generative Artificial Intelligence',
    description:
      'LLM fundamentals, prompt engineering, embeddings, vector databases, RAG, fine-tuning, and building production-ready AI applications.',
    icon: '◎',
    accentColor: '#c9a96e',
    progress: 0,
    repo: `${BASE}/Generative-AI`,
    topics: [
      { name: 'LLM Fundamentals',   github: `${BASE}/Generative-AI/LLM-Fundamentals` },
      { name: 'Prompt Engineering', github: `${BASE}/Generative-AI/Prompt-Engineering` },
      { name: 'Embeddings',         github: `${BASE}/Generative-AI/Embeddings` },
      { name: 'Vector Databases',   github: `${BASE}/Generative-AI/Vector-Databases` },
      { name: 'RAG',                github: `${BASE}/Generative-AI/RAG` },
      { name: 'Fine-Tuning',        github: `${BASE}/Generative-AI/Fine-Tuning` },
      { name: 'LLM APIs',           github: `${BASE}/Generative-AI/LLM-APIs` },
      { name: 'AI Applications',    github: `${BASE}/Generative-AI/AI-Applications` },
      { name: 'Evaluation',         github: `${BASE}/Generative-AI/Evaluation` },
      { name: 'Deployment',         github: `${BASE}/Generative-AI/Deployment` },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 3. WEB DEVELOPMENT
  // ─────────────────────────────────────────────────────────
  {
    id: 'web-dev',
    name: 'Web Dev',
    fullName: 'Web Development',
    description:
      'Full-stack web engineering: HTML, CSS, JavaScript, React, Node.js, REST APIs, authentication, databases, and deployment.',
    icon: '◈',
    accentColor: '#4a90d9',
    progress: 0,
    repo: `${BASE}/Web-Development`,
    topics: [
      { name: 'HTML',               github: `${BASE}/Web-Development/HTML` },
      { name: 'CSS',                github: `${BASE}/Web-Development/CSS` },
      { name: 'JavaScript',         github: `${BASE}/Web-Development/JavaScript` },
      { name: 'React',              github: `${BASE}/Web-Development/React` },
      { name: 'Node.js',            github: `${BASE}/Web-Development/Node.js` },
      { name: 'Express.js',         github: `${BASE}/Web-Development/Express.js` },
      { name: 'REST APIs',          github: `${BASE}/Web-Development/REST-APIs` },
      { name: 'Authentication',     github: `${BASE}/Web-Development/Authentication` },
      { name: 'Databases',          github: `${BASE}/Web-Development/Databases` },
      { name: 'Full-Stack Projects',github: `${BASE}/Web-Development/Full-Stack-Projects` },
      { name: 'Deployment',         github: `${BASE}/Web-Development/Deployment` },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // 4. DSA
  // ─────────────────────────────────────────────────────────
  {
    id: 'dsa',
    name: 'DSA',
    fullName: 'Data Structures & Algorithms',
    description:
      'Arrays, trees, graphs, dynamic programming and classical algorithmic patterns for competitive programming and technical interviews.',
    icon: '⟁',
    accentColor: '#5aaa72',
    progress: 0,
    repo: `${BASE}/DSA`,
    topics: [
      { name: 'Arrays',               github: `${BASE}/DSA/Arrays` },
      { name: 'Strings',              github: `${BASE}/DSA/Strings` },
      { name: 'Hashing',              github: `${BASE}/DSA/Hashing` },
      { name: 'Two Pointers',         github: `${BASE}/DSA/Two-Pointers` },
      { name: 'Sliding Window',       github: `${BASE}/DSA/Sliding-Window` },
      { name: 'Linked Lists',         github: `${BASE}/DSA/Linked-Lists` },
      { name: 'Stack & Queue',        github: `${BASE}/DSA/Stack-and-Queue` },
      { name: 'Binary Search',        github: `${BASE}/DSA/Binary-Search` },
      { name: 'Trees',                github: `${BASE}/DSA/Trees` },
      { name: 'Graphs',               github: `${BASE}/DSA/Graphs` },
      { name: 'Heaps',                github: `${BASE}/DSA/Heaps` },
      { name: 'Greedy',               github: `${BASE}/DSA/Greedy` },
      { name: 'Backtracking',         github: `${BASE}/DSA/Backtracking` },
      { name: 'Dynamic Programming',  github: `${BASE}/DSA/Dynamic-Programming` },
    ],
  },
];
