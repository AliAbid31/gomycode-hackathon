"""Main FastAPI application for MarkAi.

The central FastAPI server for the collaborative Marketing and Creative platform.
"""

import logging
from contextlib import asynccontextmanager
from dotenv import load_dotenv

# Load environment variables first
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import DB
from brandforge.db.database import init_db

# Import routers
from brandforge.api.routes import auth, campaigns, briefs, tasks, assets

logger = logging.getLogger("markai")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for FastAPI."""
    logger.info("🚀 Starting MarkAi platform...")

    # Initialize SQLModel Database
    init_db()
    logger.info("✅ Database initialized")

    logger.info("🎯 MarkAi is ready!")

    yield

    # Shutdown: cleanup
    logger.info("👋 Shutting down MarkAi platform...")

app = FastAPI(
    title="MarkAi",
    description="Collaborative Marketing and Creative Platform",
    version="2.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(auth.router)
app.include_router(campaigns.router)
app.include_router(briefs.router)
app.include_router(tasks.router)
app.include_router(assets.router)

@app.get("/health", tags=["System"])
async def health():
    """Health check endpoint."""
    return {"status": "healthy", "platform": "MarkAi", "version": "2.0.0"}
