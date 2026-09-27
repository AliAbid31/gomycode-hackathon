from sqlmodel import Session, select
from brandforge.db.database import engine
from brandforge.models.users import User, RoleEnum
from brandforge.api.routes.auth import get_password_hash

def seed_users():
    with Session(engine) as session:
        # Check if users exist
        if session.exec(select(User)).first():
            print("Users already seeded.")
            return

        marketing_user = User(
            email="marketing@markai.com",
            hashed_password=get_password_hash("password123"),
            full_name="Sarah Strategist",
            role=RoleEnum.MARKETING
        )
        
        creative_user = User(
            email="creative@markai.com",
            hashed_password=get_password_hash("password123"),
            full_name="Alex Artist",
            role=RoleEnum.CREATIVE
        )
        
        session.add(marketing_user)
        session.add(creative_user)
        session.commit()
        print("Test users created successfully!")

if __name__ == "__main__":
    seed_users()
