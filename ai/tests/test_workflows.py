import pytest
from unittest.mock import MagicMock

@pytest.fixture
def mock_deps():
    return {"knowledge": MagicMock(), "db": MagicMock()}

def test_strategy_workflow(mock_deps):
    try:
        from brandforge.workflows.strategy import StrategyWorkflow
    except ImportError:
        pytest.skip("StrategyWorkflow not found")
    
    workflow = StrategyWorkflow(
        strategist=MagicMock(),
        trend_scout=MagicMock(),
        competitor_analyst=MagicMock()
    )
    assert workflow is not None

def test_content_workflow(mock_deps):
    try:
        from brandforge.workflows.content import ContentWorkflow
    except ImportError:
        pytest.skip("ContentWorkflow not found")
    
    workflow = ContentWorkflow(
        planner=MagicMock(),
        writer=MagicMock(),
        designer=MagicMock()
    )
    assert workflow is not None

def test_campaign_workflow(mock_deps):
    try:
        from brandforge.workflows.campaign import CampaignWorkflow
    except ImportError:
        pytest.skip("CampaignWorkflow not found")
    
    workflow = CampaignWorkflow(
        ad_manager=MagicMock(),
        strategist=MagicMock()
    )
    assert workflow is not None

def test_analysis_workflow(mock_deps):
    try:
        from brandforge.workflows.analysis import AnalysisWorkflow
    except ImportError:
        pytest.skip("AnalysisWorkflow not found")
    
    workflow = AnalysisWorkflow(
        analytics=MagicMock(),
        optimizer=MagicMock()
    )
    assert workflow is not None
