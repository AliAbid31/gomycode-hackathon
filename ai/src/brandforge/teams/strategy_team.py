from agno.team import Team
from agno.team.mode import TeamMode
from agno.models.google import Gemini

from brandforge.agents.strategist import create_brand_strategist_agent
from brandforge.agents.trend_scout import create_trend_scout_agent
from brandforge.agents.competitor_analyst import create_competitor_analyst_agent

def create_strategy_team(knowledge, db, brand_context=None) -> Team:
    brand_strategist = create_brand_strategist_agent(knowledge, db, brand_context)
    trend_scout = create_trend_scout_agent(knowledge, db, brand_context)
    competitor_analyst = create_competitor_analyst_agent(knowledge, db, brand_context)

    return Team(
        name="Strategy & Intelligence Team",
        mode=TeamMode.coordinate,
        model=Gemini(id="gemini-3.1-pro-preview"),
        members=[brand_strategist, trend_scout, competitor_analyst],
        instructions=[
            "You lead the Strategy & Intelligence division.",
            "Delegate brand identity analysis to the Brand Strategist.",
            "Delegate trend monitoring and content idea discovery to the Trend Scout.",
            "Delegate competitive analysis to the Competitor Analyst.",
            "Synthesize all findings into a comprehensive strategic assessment with actionable recommendations."
        ],
        share_member_interactions=True,
        session_state={'strategy_version': 1, 'last_review': None},
        add_session_state_to_context=True,
        markdown=True,
    )
