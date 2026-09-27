import logging
from typing import Iterator, Optional, Any, Dict

from agno.workflow import Workflow
from agno.agent import Agent, RunOutput
from agno.knowledge.knowledge import Knowledge
from agno.db.sqlite import SqliteDb

from brandforge.agents import (
    create_analytics_agent,
    create_optimizer_agent,
    create_brand_strategist_agent
)

logger = logging.getLogger(__name__)

class PerformanceReviewWorkflow(Workflow):
    description: str = "Comprehensive performance analysis and strategy optimization workflow"
    
    def __init__(self, knowledge: Knowledge, db: SqliteDb, brand_context: Optional[Dict[str, Any]] = None, **kwargs):
        super().__init__(**kwargs)
        self.session_state = {}
        
        self.analytics_agent = create_analytics_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.optimizer = create_optimizer_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.brand_strategist = create_brand_strategist_agent(knowledge=knowledge, db=db, brand_context=brand_context)

    def run(self, period: str, brand_id: str, **kwargs) -> Iterator[RunOutput]:
        """
        Runs the performance review workflow.
        
        Args:
            period (str): The time period for the review (e.g., 'last 30 days', 'Q3').
            brand_id (str): The ID of the brand.
            
        Yields:
            RunOutput: Final performance review with updated strategy.
        """
        self.session_state["period"] = period
        self.session_state["brand_id"] = brand_id
        
        # Step 1: Analytics Report
        analytics_input = f"Gather performance data for brand {brand_id} over {period} and generate reports with visualizations."
        analytics_response = self.analytics_agent.run(analytics_input)
        performance_data = analytics_response.content if analytics_response else ""
        self.session_state["performance_data"] = performance_data

        # Step 2: Optimization
        opt_input = f"Analyze this performance data, identify patterns, and recommend improvements (use reasoning tools):\n{performance_data}"
        opt_response = self.optimizer.run(opt_input)
        recommendations = opt_response.content if opt_response else ""
        self.session_state["recommendations"] = recommendations
        
        # Step 3: Strategy Update
        strategy_input = f"Update the marketing strategy based on these optimization recommendations:\n{recommendations}"
        strategy_response = self.brand_strategist.run(strategy_input)
        updated_strategy = strategy_response.content if strategy_response else ""
        self.session_state["updated_strategy"] = updated_strategy
        
        # Step 4: Compile Final Review
        final_review = (
            f"# Performance Review: {period}\n\n"
            f"## Analytics Data\n{performance_data}\n\n"
            f"## Optimization Recommendations\n{recommendations}\n\n"
            f"## Updated Strategy\n{updated_strategy}\n"
        )
        self.session_state["final_review"] = final_review
        
        yield RunOutput(content=final_review, agent=self.brand_strategist)
