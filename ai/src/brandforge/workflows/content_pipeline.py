import logging
import json
from typing import Iterator, Optional, Any, Dict

from agno.workflow import Workflow
from agno.agent import Agent, RunOutput
from agno.knowledge.knowledge import Knowledge
from agno.db.sqlite import SqliteDb

from brandforge.agents import (
    create_trend_scout_agent,
    create_content_writer_agent,
    create_creative_director_agent,
    create_image_generator_agent
)

logger = logging.getLogger(__name__)

class ContentPipelineWorkflow(Workflow):
    description: str = "End-to-end content creation pipeline: ideation \u2192 writing \u2192 design \u2192 review"
    
    def __init__(self, knowledge: Knowledge, db: SqliteDb, brand_context: Optional[Dict[str, Any]] = None, **kwargs):
        super().__init__(**kwargs)
        self.session_state = {}
        
        self.trend_scout = create_trend_scout_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.content_writer = create_content_writer_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.creative_director = create_creative_director_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.image_generator = create_image_generator_agent(knowledge=knowledge, db=db, brand_context=brand_context)

    def run(self, topic: str, platform: str, content_type: str, **kwargs) -> Iterator[RunOutput]:
        """
        Runs the content pipeline workflow.
        
        Args:
            topic (str): The content topic.
            platform (str): The target social media platform.
            content_type (str): The type of content (e.g., 'carousel', 'single image', 'video script').
            
        Yields:
            RunOutput: The complete SocialPost with all assets.
        """
        self.session_state["topic"] = topic
        self.session_state["platform"] = platform
        
        # Step 1: Trends
        trend_input = f"Research current trends related to the topic: {topic} for {platform}."
        trend_response = self.trend_scout.run(trend_input)
        trend_data = trend_response.content if trend_response else ""
        self.session_state["trend_data"] = trend_data

        # Step 2: Content Writing
        writer_input = f"Create a {content_type} for {platform} about '{topic}'. Incorporate these trends: {trend_data}. Include caption, hook, hashtags, and CTA."
        writer_response = self.content_writer.run(writer_input)
        written_content = writer_response.content if writer_response else ""
        self.session_state["written_content"] = written_content
        
        # Step 3: Creative Brief
        brief_input = f"Generate a visual brief for a {content_type} on {platform} based on this content:\n{written_content}"
        brief_response = self.creative_director.run(brief_input)
        creative_brief = brief_response.content if brief_response else ""
        self.session_state["creative_brief"] = creative_brief
        
        # Step 4: Image Generation
        image_input = f"Create a visual asset based on this brief:\n{creative_brief}"
        image_response = self.image_generator.run(image_input)
        visual_asset = image_response.content if image_response else ""
        self.session_state["visual_asset"] = visual_asset
        
        # Step 5: Compile Final Package
        final_package = (
            f"# Content Package: {topic} ({platform})\n\n"
            f"## Written Content\n{written_content}\n\n"
            f"## Creative Brief\n{creative_brief}\n\n"
            f"## Visual Asset\n{visual_asset}\n"
        )
        self.session_state["final_package"] = final_package
        
        yield RunOutput(content=final_package, agent=self.content_writer)
