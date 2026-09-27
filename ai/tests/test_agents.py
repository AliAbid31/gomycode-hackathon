import pytest
from unittest.mock import MagicMock
from agno.agent import Agent

@pytest.fixture
def mock_knowledge():
    return MagicMock()

@pytest.fixture
def mock_db():
    return MagicMock()

def test_create_brand_strategist(mock_knowledge, mock_db):
    from brandforge.agents.strategist import create_brand_strategist_agent
    agent = create_brand_strategist_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "BrandStrategist"
    assert agent.tools is not None
    assert agent.fallback_models is not None

def test_create_trend_scout(mock_knowledge, mock_db):
    from brandforge.agents.trend_scout import create_trend_scout_agent
    agent = create_trend_scout_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "TrendScout"
    assert agent.tools is not None

def test_create_competitor_analyst(mock_knowledge, mock_db):
    from brandforge.agents.competitor_analyst import create_competitor_analyst_agent
    agent = create_competitor_analyst_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "CompetitorAnalyst"
    assert agent.tools is not None

def test_create_content_planner(mock_knowledge, mock_db):
    from brandforge.agents.content_planner import create_content_planner_agent
    agent = create_content_planner_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "ContentPlanner"
    assert agent.tools is not None

def test_create_content_writer(mock_knowledge, mock_db):
    from brandforge.agents.content_writer import create_content_writer_agent
    agent = create_content_writer_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "ContentWriter"

def test_create_creative_director(mock_knowledge, mock_db):
    from brandforge.agents.creative_director import create_creative_director_agent
    agent = create_creative_director_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "CreativeDirector"

def test_create_image_generator(mock_knowledge, mock_db):
    from brandforge.agents.image_generator import create_image_generator_agent
    agent = create_image_generator_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "ImageGenerator"

def test_create_analytics_agent(mock_knowledge, mock_db):
    from brandforge.agents.analytics_agent import create_analytics_agent
    agent = create_analytics_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "AnalyticsAgent"

def test_create_ad_manager(mock_knowledge, mock_db):
    from brandforge.agents.ad_manager import create_ad_manager_agent
    agent = create_ad_manager_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "AdManager"

def test_create_optimizer(mock_knowledge, mock_db):
    from brandforge.agents.optimizer import create_optimizer_agent
    agent = create_optimizer_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "Optimizer"

def test_create_cmo(mock_knowledge, mock_db):
    from brandforge.agents.cmo import create_cmo_agent
    agent = create_cmo_agent(knowledge=mock_knowledge, db=mock_db)
    assert isinstance(agent, Agent)
    assert agent.name == "CMO"
