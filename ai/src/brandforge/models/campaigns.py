from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

class Campaign(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    objective: str
    target_audience: Optional[str] = None
    budget: Optional[float] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    workspace_id: int = Field(foreign_key="workspace.id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    workspace: Optional["Workspace"] = Relationship(back_populates="campaigns")
    briefs: List["CreativeBrief"] = Relationship(back_populates="campaign")
