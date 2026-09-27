<div align="center">
  <h1>✨ MarkAi</h1>
  <p><strong>The AI-Augmented Collaborative Platform for Marketing & Creative Teams</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Python-3.11+-blue.svg" alt="Python Version">
    <img src="https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi" alt="FastAPI">
    <img src="https://img.shields.io/badge/Database-SQLite%20%7C%20SQLModel-lightgrey" alt="Database">
    <img src="https://img.shields.io/badge/AI-Google%20Gemini-orange.svg" alt="Google Gemini">
  </p>
</div>

---

## 📖 Overview

**MarkAi** is a modern, human-in-the-loop marketing operations platform designed to bridge the gap between **Marketing Strategists** and **Visual Artists**. 

By replacing fully autonomous, black-box AI with targeted, on-demand AI assistants, MarkAi accelerates the creative pipeline. Marketing teams can instantly generate structured creative briefs using AI, and seamlessly assign them as production tasks to visual artists in a unified, collaborative workspace.

## 🚀 Key Features

* **👥 Role-Based Workspaces**: Dedicated flows for `Marketing` (Strategy & Approval) and `Creative` (Production & Delivery).
* **📊 Campaign Management**: Define campaign objectives, target audiences, and budgets in a centralized hub.
* **🤖 AI Studio (Brief Generation)**: Leverage **Google Gemini** (via Agno) to instantly transform high-level campaign goals into detailed, structured creative briefs.
* **📋 Task Pipeline**: Assign AI-generated or manual briefs directly to visual artists as trackable production tasks.
* **✅ Review & Approvals**: Creatives upload digital assets directly to their tasks, automatically triggering an `IN_REVIEW` status for marketing directors to approve.

---

## 🏛️ System Architecture

MarkAi is built on a modern, asynchronous Python stack designed for speed and scalability.

```mermaid
graph TD
    subgraph Frontend Clients
        UI[React / Next.js Web App]
    end

    subgraph Backend API Layer
        API[FastAPI Gateway]
        Auth[JWT Auth Middleware]
        
        API --> Auth
        Auth --> Routes
        
        subgraph API Routes
            AuthR[Auth Routes]
            Camp[Campaigns]
            Brief[AI Briefs]
            Task[Tasks]
            Asset[Assets]
        end
    end

    subgraph Data & AI Layer
        DB[(SQLite / SQLModel)]
        AIAgent[Agno AI Agent]
        LLM[Google Gemini 2.5 Flash]
        Storage[Cloud Storage mock]
    end

    UI <-->|HTTP / REST| API
    Routes --> AuthR & Camp & Brief & Task & Asset
    
    AuthR & Camp & Task --> DB
    Asset --> Storage & DB
    Brief --> AIAgent
    Brief --> DB
    AIAgent <-->|Prompt / Completion| LLM
```

---

## 🔄 Core Collaborative Workflow

The core value of MarkAi is the seamless handoff between the strategic team (Marketing), the AI Assistant, and the production team (Visual Artists).

```mermaid
sequenceDiagram
    actor Marketing as Marketing Strategist
    participant AI as MarkAi Brief Generator
    actor Creative as Visual Artist
    participant DB as System Database

    Marketing->>DB: 1. Create Marketing Campaign
    Marketing->>AI: 2. Request Creative Brief via /briefs/generate
    AI-->>Marketing: Returns detailed AI-generated brief
    Marketing->>DB: 3. Assign Brief as a 'Task' to Creative User
    
    Creative->>DB: 4. Views assigned Tasks
    Creative->>Creative: Works on creative assets (Figma, Photoshop, etc.)
    Creative->>DB: 5. Uploads completed Asset via /assets
    
    Note over DB: Task Status automatically shifts to IN_REVIEW
    
    Marketing->>DB: 6. Reviews submitted Asset
    alt Asset Approved
        Marketing->>DB: Mark Task as APPROVED
    else Revision Needed
        Marketing->>DB: Mark Task as IN_PROGRESS (Request Changes)
    end
```

---

## 🗄️ Database Schema (Entity-Relationship)

The system uses a strictly typed relational schema managed by SQLModel (Pydantic + SQLAlchemy). 

```mermaid
erDiagram
    WORKSPACE ||--o{ USER : contains
    WORKSPACE ||--o{ CAMPAIGN : owns
    USER ||--o{ TASK : assigned_to
    
    CAMPAIGN ||--o{ CREATIVE_BRIEF : generates
    CREATIVE_BRIEF ||--o{ TASK : translates_to
    TASK ||--o{ ASSET : delivers
    
    USER {
        int id PK
        string email
        string full_name
        enum role "MARKETING | CREATIVE"
        int workspace_id FK
    }
    
    WORKSPACE {
        int id PK
        string name
    }
    
    CAMPAIGN {
        int id PK
        string name
        string objective
        float budget
        int workspace_id FK
    }
    
    CREATIVE_BRIEF {
        int id PK
        string title
        string content
        boolean generated_by_ai
        int campaign_id FK
    }
    
    TASK {
        int id PK
        string title
        enum status "TODO | IN_PROGRESS | IN_REVIEW | APPROVED"
        int brief_id FK
        int assignee_id FK
    }
    
    ASSET {
        int id PK
        string file_url
        string asset_type
        int task_id FK
    }
```

---

## 🛠️ Getting Started

### 1. Prerequisites
* Python 3.11 or higher
* [Optional] A Google Gemini API Key for AI features

### 2. Installation

Clone the repository and set up a virtual environment:

```bash
# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -e .
pip install sqlmodel passlib[bcrypt] python-jose pydantic[email] python-multipart
```

### 3. Environment Variables

Create a `.env` file in the root directory (or update the existing one) and add your AI credentials:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

### 4. Running the Server

Start the FastAPI backend with hot-reloading:

```bash
uvicorn brandforge.api.app:app --reload --port 8000
```

### 5. API Documentation

Once the server is running, the interactive API documentation is automatically generated. Visit:
👉 **[http://localhost:8000/docs](http://localhost:8000/docs)** 

---

## 📂 Project Structure

```text
src/brandforge/
├── agents/             # Targeted AI assistants (e.g., brief_generator.py)
├── api/
│   ├── middleware/     # Auth and Role-Based Access Control (RBAC)
│   ├── routes/         # REST endpoints (auth, campaigns, briefs, tasks, assets)
│   └── app.py          # FastAPI application factory & DB initialization
├── db/                 # SQLModel database engine and session management
└── models/             # Relational data models (Users, Campaigns, Tasks, etc.)
```
