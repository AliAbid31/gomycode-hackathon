import logging
from typing import Iterator, Optional, Any, Dict

from agno.workflow import Workflow
from agno.agent import Agent, RunOutput
from agno.knowledge.knowledge import Knowledge
from agno.db.sqlite import SqliteDb

from brandforge.agents import (
    create_trend_scout_agent,
    create_competitor_analyst_agent,
    create_brand_strategist_agent,
    create_content_planner_agent
)

logger = logging.getLogger(__name__)

class BrandOnboardingWorkflow(Workflow):
    description: str = "Complete brand analysis and marketing strategy generation workflow"
    
    def __init__(self, knowledge: Knowledge, db: SqliteDb, brand_context: Optional[Dict[str, Any]] = None, **kwargs):
        super().__init__(**kwargs)
        self.session_state = {}
        
        self.trend_scout = create_trend_scout_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.competitor_analyst = create_competitor_analyst_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.brand_strategist = create_brand_strategist_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.content_planner = create_content_planner_agent(knowledge=knowledge, db=db, brand_context=brand_context)

    def run(self, brand_url: str, brand_name: str, industry: str, **kwargs) -> Iterator[RunOutput]:
        """
        Runs the brand onboarding workflow.
        
        Args:
            brand_url (str): The URL of the brand's website.
            brand_name (str): The name of the brand.
            industry (str): The brand's industry.
            
        Yields:
            RunOutput: Final comprehensive onboarding report.
        """
        logger.info(f"Starting onboarding for {brand_name} in {industry}")
        self.session_state["brand_name"] = brand_name
        self.session_state["industry"] = industry
        
        # Step 1: Industry Trends
        trend_input = f"Research the latest marketing and consumer trends for the {industry} industry."
        trend_response = self.trend_scout.run(trend_input)
        trend_data = trend_response.content if trend_response else ""
        self.session_state["trend_data"] = trend_data

        # Step 2: Competitor Analysis
        competitor_input = f"Analyze the competitive landscape for {brand_name} ({brand_url}) in the {industry} industry. Trends to consider:\n{trend_data}"
        competitor_response = self.competitor_analyst.run(competitor_input)
        competitor_data = competitor_response.content if competitor_response else ""
        self.session_state["competitor_data"] = competitor_data
        
        # Step 3: Brand Strategy
        strategy_input = f"Develop a comprehensive marketing strategy for {brand_name} based on these industry trends:\n{trend_data}\n\nAnd competitor analysis:\n{competitor_data}"
        strategy_response = self.brand_strategist.run(strategy_input)
        strategy_data = strategy_response.content if strategy_response else ""
        self.session_state["strategy_data"] = strategy_data
        
        # Step 4: Content Calendar
        content_input = f"Based on the following strategy, create a 2-week content calendar for {brand_name}:\n{strategy_data}"
        content_response = self.content_planner.run(content_input)
        content_data = content_response.content if content_response else ""
        self.session_state["content_calendar"] = content_data
        
        # Step 5: Compile and yield final report
        final_report = (
            f"# Brand Onboarding Report: {brand_name}\n\n"
            f"## Industry Trends\n{trend_data}\n\n"
            f"## Competitor Analysis\n{competitor_data}\n\n"
            f"## Marketing Strategy\n{strategy_data}\n\n"
            f"## 2-Week Content Calendar\n{content_data}\n"
        )
        
        self.session_state["final_report"] = final_report
        
        yield RunOutput(content=final_report, agent=self.brand_strategist)
