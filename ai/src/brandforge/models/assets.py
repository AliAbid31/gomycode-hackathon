from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

class Asset(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    task_id: int = Field(foreign_key="task.id")
    file_url: str
    asset_type: str  # e.g., 'image/png', 'video/mp4'
    version: int = Field(default=1)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    task: Optional["Task"] = Relationship(back_populates="assets")
