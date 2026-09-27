from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import Session, select
from typing import List

from brandforge.db.database import get_session
from brandforge.models.assets import Asset
from brandforge.models.tasks import Task, TaskStatus
from brandforge.models.users import User
from brandforge.api.middleware.auth import require_creative_role, get_current_user

router = APIRouter(prefix="/assets", tags=["Assets"])

@router.post("/", response_model=Asset)
async def upload_asset(
    task_id: int = Form(...),
    file: UploadFile = File(...),
    user: User = Depends(require_creative_role),
    session: Session = Depends(get_session)
):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # In a real app, save file to S3/Cloud Storage
    # Mocking the file URL for now
    file_url = f"https://storage.markai.com/mock/{file.filename}"
    
    asset = Asset(
        task_id=task_id,
        file_url=file_url,
        asset_type=file.content_type or "application/octet-stream"
    )
    
    # Update task status to IN_REVIEW
    task.status = TaskStatus.IN_REVIEW
    
    session.add(asset)
    session.add(task)
    session.commit()
    session.refresh(asset)
    return asset

@router.get("/", response_model=List[Asset])
def list_assets(task_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    assets = session.exec(select(Asset).where(Asset.task_id == task_id)).all()
    return assets
