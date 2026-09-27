from agno.team import Team
from agno.team.mode import TeamMode
from agno.models.google import Gemini

from brandforge.agents.content_planner import create_content_planner_agent
from brandforge.agents.content_writer import create_content_writer_agent
from brandforge.agents.creative_director import create_creative_director_agent
from brandforge.agents.image_generator import create_image_generator_agent

def create_content_team(knowledge, db, brand_context=None) -> Team:
    content_planner = create_content_planner_agent(knowledge, db, brand_context)
    content_writer = create_content_writer_agent(knowledge, db, brand_context)
    creative_director = create_creative_director_agent(knowledge, db, brand_context)
    image_generator = create_image_generator_agent(knowledge, db, brand_context)

    return Team(
        name="Content & Creative Team",
        mode=TeamMode.coordinate,
        model=Gemini(id="gemini-3.1-pro-preview"),
        members=[content_planner, content_writer, creative_director, image_generator],
        instructions=[
            "Lead the content production pipeline. For content requests: 1) Have Content Planner determine what/when/where to post.",
            "2) Have Content Writer craft the copy, captions, hooks, and hashtags.",
            "3) Have Creative Director create the visual brief.",
            "4) Have Image Generator produce the visual assets.",
            "Ensure all output aligns with brand voice and strategy."
        ],
        share_member_interactions=True,
        session_state={'content_queue': [], 'published_count': 0},
        markdown=True,
    )
