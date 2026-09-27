from brandforge.models.campaigns import Campaign
from agno.agent import Agent
from agno.models.google import Gemini

def generate_brief_content(campaign: Campaign, context: str) -> str:
    """Generates a creative brief using AI based on the campaign details."""
    prompt = f"""
    You are an expert marketing strategist. 
    Create a detailed creative brief for the following campaign:
    
    Campaign Name: {campaign.name}
    Objective: {campaign.objective}
    Target Audience: {campaign.target_audience or 'General'}
    
    Additional Context: {context}
    
    The brief should include:
    1. Visual Direction
    2. Key Message
    3. Deliverables required
    """
    
    try:
        agent = Agent(
            model=Gemini(id="gemini-2.5-flash"),
            description="You are a senior marketing strategist.",
            markdown=True,
        )
        response = agent.run(prompt)
        return response.content
    except Exception as e:
        return f"Mocked AI Brief Content due to API error: {str(e)}\n\nVisual Direction: Bold and modern.\nKey Message: {campaign.objective}\nDeliverables: 3 social media posts."
