from enum import Enum
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

class RoleEnum(str, Enum):
    MARKETING = "marketing"
    CREATIVE = "creative"
    ADMIN = "admin"

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    full_name: str
    role: RoleEnum = Field(default=RoleEnum.MARKETING)
    workspace_id: Optional[int] = Field(default=None, foreign_key="workspace.id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    workspace: Optional["Workspace"] = Relationship(back_populates="users")
    tasks_assigned: List["Task"] = Relationship(back_populates="assignee")
