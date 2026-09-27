from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from typing import List

from brandforge.db.database import get_session
from brandforge.models.briefs import CreativeBrief
from brandforge.models.campaigns import Campaign
from brandforge.models.users import User
from brandforge.api.middleware.auth import require_marketing_role, get_current_user
from brandforge.agents.brief_generator import generate_brief_content

router = APIRouter(prefix="/briefs", tags=["Briefs"])

class BriefCreate(BaseModel):
    title: str
    content: str
    campaign_id: int

class AIBriefRequest(BaseModel):
    campaign_id: int
    context: str

@router.post("/", response_model=CreativeBrief)
def create_brief(brief_in: BriefCreate, user: User = Depends(require_marketing_role), session: Session = Depends(get_session)):
    brief = CreativeBrief(**brief_in.model_dump())
    session.add(brief)
    session.commit()
    session.refresh(brief)
    return brief

@router.post("/generate", response_model=CreativeBrief)
def generate_brief(req: AIBriefRequest, user: User = Depends(require_marketing_role), session: Session = Depends(get_session)):
    campaign = session.get(Campaign, req.campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # Generate content using AI
    generated_content = generate_brief_content(campaign, req.context)
    
    brief = CreativeBrief(
        title=f"AI Brief for {campaign.name}",
        content=generated_content,
        campaign_id=campaign.id,
        generated_by_ai=True
    )
    session.add(brief)
    session.commit()
    session.refresh(brief)
    return brief

@router.get("/", response_model=List[CreativeBrief])
def list_briefs(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    briefs = session.exec(select(CreativeBrief)).all()
    return briefs
