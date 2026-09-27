from brandforge.db.database import get_db
from brandforge.knowledge.brand_kb import create_brand_knowledge_base
kb = create_brand_knowledge_base()
db = get_db()
print("Initialized DB and KB")

from brandforge.agents.trend_scout import create_trend_scout_agent
try:
    create_trend_scout_agent(knowledge=kb, db=db)
    print("Trend Scout OK")
except Exception as e:
    print("Trend Scout Error:", type(e), e)

from brandforge.agents.competitor_analyst import create_competitor_analyst_agent
try:
    create_competitor_analyst_agent(knowledge=kb, db=db)
    print("Competitor Analyst OK")
except Exception as e:
    print("Competitor Analyst Error:", type(e), e)

from brandforge.agents.strategist import create_brand_strategist_agent
try:
    create_brand_strategist_agent(knowledge=kb, db=db)
    print("Strategist OK")
except Exception as e:
    print("Strategist Error:", type(e), e)

from brandforge.agents.content_planner import create_content_planner_agent
try:
    create_content_planner_agent(knowledge=kb, db=db)
    print("Content Planner OK")
except Exception as e:
    print("Content Planner Error:", type(e), e)
