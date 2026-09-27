from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select
from typing import List, Optional
from datetime import datetime

from brandforge.db.database import get_session
from brandforge.models.tasks import Task, TaskStatus
from brandforge.models.users import User
from brandforge.api.middleware.auth import require_marketing_role, require_creative_role, get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])

class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    brief_id: int
    assignee_id: Optional[int] = None
    due_date: Optional[datetime] = None

class TaskStatusUpdate(BaseModel):
    status: TaskStatus

@router.post("/", response_model=Task)
def create_task(task_in: TaskCreate, user: User = Depends(require_marketing_role), session: Session = Depends(get_session)):
    task = Task(**task_in.model_dump())
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.get("/", response_model=List[Task])
def get_tasks(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()
    return tasks

@router.patch("/{task_id}/status", response_model=Task)
def update_task_status(task_id: int, status_update: TaskStatusUpdate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Optional: ensure only assignee or marketing can update
    task.status = status_update.status
    session.add(task)
    session.commit()
    session.refresh(task)
    return task
