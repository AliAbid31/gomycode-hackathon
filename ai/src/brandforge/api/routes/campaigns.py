from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from typing import List, Optional

from brandforge.db.database import get_session
from brandforge.models.campaigns import Campaign
from brandforge.models.users import User
from brandforge.api.middleware.auth import require_marketing_role, get_current_user

router = APIRouter(prefix="/campaigns", tags=["Campaigns"])

class CampaignCreate(BaseModel):
    name: str
    objective: str
    target_audience: Optional[str] = None
    budget: Optional[float] = None
    workspace_id: int

@router.post("/", response_model=Campaign)
def create_campaign(campaign_in: CampaignCreate, user: User = Depends(require_marketing_role), session: Session = Depends(get_session)):
    campaign = Campaign(**campaign_in.model_dump())
    session.add(campaign)
    session.commit()
    session.refresh(campaign)
    return campaign

@router.get("/", response_model=List[Campaign])
def get_campaigns(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    # Should probably filter by user.workspace_id
    campaigns = session.exec(select(Campaign)).all()
    return campaigns
