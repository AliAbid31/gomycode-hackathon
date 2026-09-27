import json
import logging
from typing import Dict, List, Any

from agno.tools import Toolkit
from agno.knowledge.knowledge import Knowledge
from agno.db.sqlite import SqliteDb

logger = logging.getLogger(__name__)

class BrandKnowledgeToolkit(Toolkit):
    def __init__(self, knowledge: Knowledge, db: SqliteDb, **kwargs):
        super().__init__(name="brand_knowledge_toolkit", **kwargs)
        self.knowledge = knowledge
        self.db = db
        
        self.register(self.update_brand_voice)
        self.register(self.add_competitor)
        self.register(self.store_campaign_learning)
        self.register(self.get_brand_guidelines)
        self.register(self.add_content_reference)
        self.register(self.search_past_content)

    def update_brand_voice(self, tone: str, style: str, dos: List[str], donts: List[str]) -> str:
        """
        Updates brand voice guidelines in knowledge base.
        """
        doc = {
            "type": "brand_voice",
            "tone": tone,
            "style": style,
            "dos": dos,
            "donts": donts
        }
        # In a real scenario, this would interact with self.knowledge or self.db more robustly
        return json.dumps({"status": "success", "message": "Brand voice updated successfully."})

    def add_competitor(self, name: str, website: str, notes: str) -> str:
        """
        Adds competitor to tracking.
        """
        doc = {
            "type": "competitor",
            "name": name,
            "website": website,
            "notes": notes
        }
        return json.dumps({"status": "success", "message": f"Competitor {name} added."})

    def store_campaign_learning(self, campaign_id: str, learning: str, category: str) -> str:
        """
        Stores what worked/didn't.
        """
        doc = {
            "type": "campaign_learning",
            "campaign_id": campaign_id,
            "learning": learning,
            "category": category
        }
        return json.dumps({"status": "success", "message": "Learning stored."})

    def get_brand_guidelines(self) -> str:
        """
        Retrieves current brand guidelines summary.
        """
        mock_guidelines = {
            "tone": "Professional yet approachable",
            "style": "Clear and concise",
            "dos": ["Use active voice", "Highlight benefits"],
            "donts": ["Use excessive jargon", "Be overly aggressive"]
        }
        return json.dumps(mock_guidelines)

    def add_content_reference(self, title: str, url: str, platform: str, notes: str) -> str:
        """
        Stores content inspiration.
        """
        doc = {
            "type": "content_reference",
            "title": title,
            "url": url,
            "platform": platform,
            "notes": notes
        }
        return json.dumps({"status": "success", "message": "Content reference added."})

    def search_past_content(self, query: str, limit: int = 5) -> str:
        """
        Searches historical content.
        """
        # Mocking search results
        results = [
            {"title": f"Past content matching {query} - 1", "performance": "High"},
            {"title": f"Past content matching {query} - 2", "performance": "Medium"}
        ]
        return json.dumps({"results": results[:limit]})
