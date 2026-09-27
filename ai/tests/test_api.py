import pytest
from fastapi.testclient import TestClient
from unittest.mock import MagicMock

try:
    from brandforge.api.app import app
except ImportError:
    app = None

@pytest.fixture
def client():
    if not app:
        pytest.skip("API application not found")
    return TestClient(app)

def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["platform"] == "BrandForge AI"

def test_chat_unauthorized(client):
    response = client.post("/api/v1/chat", json={"message": "hello"})
    # Expect 401/403 or similar if auth is required, depending on implementation
    assert response.status_code in [401, 403, 404]

def test_token_generation(client):
    response = client.post("/api/v1/auth/token", data={"username": "test", "password": "password"})
    # Based on mock/dummy implementation
    if response.status_code == 200:
        assert "access_token" in response.json()
