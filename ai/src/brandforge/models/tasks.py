from enum import Enum
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone

class TaskStatus(str, Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    IN_REVIEW = "in_review"
    APPROVED = "approved"
    REJECTED = "rejected"

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: Optional[str] = None
    status: TaskStatus = Field(default=TaskStatus.TODO)
    brief_id: int = Field(foreign_key="creativebrief.id")
    assignee_id: Optional[int] = Field(default=None, foreign_key="user.id")
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    brief: Optional["CreativeBrief"] = Relationship(back_populates="tasks")
    assignee: Optional["User"] = Relationship(back_populates="tasks_assigned")
    assets: List["Asset"] = Relationship(back_populates="task")
