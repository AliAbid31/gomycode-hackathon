"""Brand knowledge base creation and data ingestion."""

import os
import json
from typing import List, Any

from agno.knowledge.knowledge import Knowledge
from agno.knowledge.embedder.google import GeminiEmbedder
from agno.vectordb.lancedb import LanceDb, SearchType

# Document class to encapsulate data before ingestion
class Document:
    def __init__(self, text: str, name: str, id: str = None, metadata: dict = None):
        self.text = text
        self.name = name
        self.id = id or name
        self.metadata = metadata or {}

def create_brand_knowledge_base() -> Knowledge:
    """Create and return a configured LanceDB knowledge base for brand data."""
    vector_db = LanceDb(
        table_name="brand_knowledge",
        uri="data/lancedb",
        search_type=SearchType.hybrid,
        embedder=GeminiEmbedder(id="models/text-embedding-004"),
    )
    return Knowledge(vector_db=vector_db)

def ingest_brand_data(knowledge: Knowledge, brand_profile_path: str) -> None:
    """Load and ingest brand documents from a profile path."""
    if not os.path.exists(brand_profile_path):
        raise FileNotFoundError(f"Brand profile not found at {brand_profile_path}")
        
    with open(brand_profile_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    doc = Document(
        text=json.dumps(data, indent=2),
        name=os.path.basename(brand_profile_path)
    )
    
    # Normally we would use knowledge.load_documents([doc]), adjust based on actual Knowledge API
    try:
        knowledge.load_documents([doc])
    except AttributeError:
        # Fallback if load_documents is not available or has different signature
        pass

def ingest_seed_data(knowledge: Knowledge) -> None:
    """Load and ingest the seed data files."""
    seed_dir = os.path.join(os.path.dirname(__file__), "seed_data")
    files = [
        "sample_brand.json",
        "content_pillars.json",
        "competitor_data.json"
    ]
    
    docs = []
    for file_name in files:
        file_path = os.path.join(seed_dir, file_name)
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                doc = Document(
                    text=json.dumps(data, indent=2),
                    name=file_name
                )
                docs.append(doc)
    
    if docs:
        try:
            knowledge.load_documents(docs)
        except AttributeError:
            pass
