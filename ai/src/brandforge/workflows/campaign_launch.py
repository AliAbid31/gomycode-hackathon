import logging
from typing import Iterator, Optional, Any, Dict

from agno.workflow import Workflow
from agno.agent import Agent, RunOutput
from agno.knowledge.knowledge import Knowledge
from agno.db.sqlite import SqliteDb

from brandforge.agents import (
    create_brand_strategist_agent,
    create_content_writer_agent,
    create_creative_director_agent,
    create_ad_manager_agent
)

logger = logging.getLogger(__name__)

class CampaignLaunchWorkflow(Workflow):
    description: str = "End-to-end ad campaign creation and launch workflow"
    
    def __init__(self, knowledge: Knowledge, db: SqliteDb, brand_context: Optional[Dict[str, Any]] = None, **kwargs):
        super().__init__(**kwargs)
        self.session_state = {}
        
        self.brand_strategist = create_brand_strategist_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.content_writer = create_content_writer_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.creative_director = create_creative_director_agent(knowledge=knowledge, db=db, brand_context=brand_context)
        self.ad_manager = create_ad_manager_agent(knowledge=knowledge, db=db, brand_context=brand_context)

    def run(self, campaign_name: str, objective: str, budget: float, target_audience: str, **kwargs) -> Iterator[RunOutput]:
        """
        Runs the campaign launch workflow.
        
        Args:
            campaign_name (str): The name of the campaign.
            objective (str): The marketing objective.
            budget (float): The campaign budget.
            target_audience (str): Description of the target audience.
            
        Yields:
            RunOutput: Complete campaign launch report.
        """
        self.session_state["campaign_name"] = campaign_name
        self.session_state["budget"] = budget
        
        # Step 1: Campaign Strategy
        strategy_input = f"Define a campaign strategy aligned with brand objectives. Name: {campaign_name}, Objective: {objective}, Audience: {target_audience}."
        strategy_response = self.brand_strategist.run(strategy_input)
        strategy_data = strategy_response.content if strategy_response else ""
        self.session_state["strategy_data"] = strategy_data

        # Step 2: Ad Copy
        copy_input = f"Create 3 ad copy variations (headlines, primary text, descriptions) based on this strategy:\n{strategy_data}"
        copy_response = self.content_writer.run(copy_input)
        ad_copy = copy_response.content if copy_response else ""
        self.session_state["ad_copy"] = ad_copy
        
        # Step 3: Creative Briefs
        brief_input = f"Generate creative briefs for ad visuals matching these copies:\n{ad_copy}"
        brief_response = self.creative_director.run(brief_input)
        creative_brief = brief_response.content if brief_response else ""
        self.session_state["creative_brief"] = creative_brief
        
        # Step 4: Ad Setup
        setup_input = (
            f"Set up the Meta Ads campaign '{campaign_name}' with objective '{objective}', "
            f"budget ${budget}, targeting '{target_audience}'.\n"
            f"Use this copy:\n{ad_copy}\nAnd these briefs:\n{creative_brief}"
        )
        setup_response = self.ad_manager.run(setup_input)
        ad_setup = setup_response.content if setup_response else ""
        self.session_state["ad_setup"] = ad_setup
        
        # Step 5: Compile Final Report
        final_report = (
            f"# Campaign Launch Report: {campaign_name}\n\n"
            f"## Strategy\n{strategy_data}\n\n"
            f"## Ad Copy\n{ad_copy}\n\n"
            f"## Creative Briefs\n{creative_brief}\n\n"
            f"## Ad Setup Details\n{ad_setup}\n"
        )
        self.session_state["final_report"] = final_report
        
        yield RunOutput(content=final_report, agent=self.ad_manager)
