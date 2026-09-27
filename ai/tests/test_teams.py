import pytest
from unittest.mock import MagicMock
from agno.team import Team
from agno.team.mode import TeamMode

@pytest.fixture
def mock_deps():
    return {"knowledge": MagicMock(), "db": MagicMock()}

def test_create_strategy_team(mock_deps):
    try:
        from brandforge.teams.strategy import create_strategy_team
    except ImportError:
        pytest.skip("Strategy team module not found")
        
    team = create_strategy_team(**mock_deps)
    assert isinstance(team, Team)
    assert team.name == "StrategyTeam"
    assert team.share_member_interactions is True
    assert hasattr(team, "session_state")

def test_create_content_team(mock_deps):
    try:
        from brandforge.teams.content import create_content_team
    except ImportError:
        pytest.skip("Content team module not found")

    team = create_content_team(**mock_deps)
    assert isinstance(team, Team)
    assert team.name == "ContentTeam"
    assert team.share_member_interactions is True

def test_create_growth_team(mock_deps):
    try:
        from brandforge.teams.growth import create_growth_team
    except ImportError:
        pytest.skip("Growth team module not found")

    team = create_growth_team(**mock_deps)
    assert isinstance(team, Team)
    assert team.name == "GrowthTeam"
    assert team.share_member_interactions is True

def test_create_executive_team(mock_deps):
    try:
        from brandforge.teams.executive import create_executive_team
    except ImportError:
        pytest.skip("Executive team module not found")

    team = create_executive_team(**mock_deps)
    assert isinstance(team, Team)
    assert team.name == "ExecutiveTeam"
    assert team.share_member_interactions is True
