from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session
from typing import Optional

from brandforge.db.database import get_session
from brandforge.models.users import User, RoleEnum

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    try:
        user_id = int(token)
        user = session.get(User, user_id)
        if not user:
            raise ValueError()
        return user
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def require_marketing_role(user: User = Depends(get_current_user)) -> User:
    if user.role != RoleEnum.MARKETING and user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Marketing role required")
    return user

def require_creative_role(user: User = Depends(get_current_user)) -> User:
    if user.role != RoleEnum.CREATIVE and user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Creative role required")
    return user
