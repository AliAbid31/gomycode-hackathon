from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlmodel import Session, select
from passlib.context import CryptContext
from datetime import timedelta
import os
from typing import Optional

from brandforge.db.database import get_session
from brandforge.models.users import User, RoleEnum

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: RoleEnum

class UserRead(BaseModel):
    id: int
    email: str
    full_name: str
    role: RoleEnum
    workspace_id: Optional[int]

def get_password_hash(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/signup", response_model=UserRead)
def signup(user_in: UserCreate, session: Session = Depends(get_session)):
    user_db = session.exec(select(User).where(User.email == user_in.email)).first()
    if user_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user_in.password)
    user = User(
        email=user_in.email,
        hashed_password=hashed_pwd,
        full_name=user_in.full_name,
        role=user_in.role
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # In a real app, generate a JWT. For hackathon simplicity, return user ID as token
    return {"access_token": str(user.id), "token_type": "bearer", "role": user.role}
