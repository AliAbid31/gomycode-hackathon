from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

class CreativeBrief(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str
    campaign_id: int = Field(foreign_key="campaign.id")
    generated_by_ai: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    campaign: Optional["Campaign"] = Relationship(back_populates="briefs")
    tasks: List["Task"] = Relationship(back_populates="brief")
