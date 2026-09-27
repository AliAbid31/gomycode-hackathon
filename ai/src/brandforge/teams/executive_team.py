from agno.team import Team
from agno.team.mode import TeamMode
from agno.models.google import Gemini
from agno.tools.reasoning import ReasoningTools

from brandforge.teams.strategy_team import create_strategy_team
from brandforge.teams.content_team import create_content_team
from brandforge.teams.growth_team import create_growth_team

def create_executive_team(knowledge, db, brand_context=None) -> Team:
    strategy_team = create_strategy_team(knowledge, db, brand_context)
    content_team = create_content_team(knowledge, db, brand_context)
    growth_team = create_growth_team(knowledge, db, brand_context)
    
    initial_brand_name = brand_context.get('name', 'Unknown Brand') if brand_context else 'Unknown Brand'

    return Team(
        name="BrandForge AI - Executive Marketing Team",
        mode=TeamMode.tasks,
        model=Gemini(id="gemini-3.1-pro-preview"),
        members=[strategy_team, content_team, growth_team],
        instructions=[
            "You are the Chief Marketing Officer (CMO) leading BrandForge AI.",
            "You have 3 specialized teams at your disposal.",
            "For strategic questions, delegate to the Strategy & Intelligence Team.",
            "For content creation, delegate to the Content & Creative Team.",
            "For performance analysis and advertising, delegate to the Growth & Performance Team.",
            "Break complex requests into subtasks and assign to appropriate teams.",
            "Synthesize team outputs into cohesive executive-level responses.",
            "Always maintain brand consistency across all operations.",
            "Prioritize initiatives based on ROI potential.",
            "Provide clear, actionable insights with metrics.",
            "Think step-by-step about complex marketing challenges.",
            "When asked to create content, coordinate between strategy (for direction), content (for creation), and growth (for distribution)."
        ],
        share_member_interactions=True,
        session_state={
            'brand_name': initial_brand_name,
            'strategy_version': 1,
            'active_campaigns': [],
            'content_published': 0,
            'total_reach': 0
        },
        add_session_state_to_context=True,
        storage=db,
        tools=[ReasoningTools()],
        markdown=True,
    )
