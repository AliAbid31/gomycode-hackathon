from agno.team import Team
from agno.team.mode import TeamMode
from agno.models.google import Gemini

from brandforge.agents.analytics_agent import create_analytics_agent
from brandforge.agents.ad_manager import create_ad_manager_agent
from brandforge.agents.optimizer import create_optimizer_agent

def create_growth_team(knowledge, db, brand_context=None) -> Team:
    analytics_agent = create_analytics_agent(knowledge, db, brand_context)
    ad_manager = create_ad_manager_agent(knowledge, db, brand_context)
    optimizer = create_optimizer_agent(knowledge, db, brand_context)

    return Team(
        name="Growth & Performance Team",
        mode=TeamMode.coordinate,
        model=Gemini(id="gemini-3.1-pro-preview"),
        members=[analytics_agent, ad_manager, optimizer],
        instructions=[
            "Lead the growth and performance division.",
            "Delegate metric tracking and report generation to the Analytics Agent.",
            "Delegate paid campaign management to the Ad Manager.",
            "Delegate strategic optimization and learning extraction to the Optimizer.",
            "Always provide data-backed recommendations with specific numbers."
        ],
        share_member_interactions=True,
        session_state={'total_ad_spend': 0.0, 'total_reach': 0, 'optimization_cycles': 0},
        markdown=True,
    )
