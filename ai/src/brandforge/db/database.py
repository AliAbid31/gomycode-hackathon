"""Database configuration and initialization."""

import os
from sqlmodel import SQLModel, create_engine, Session

sqlite_file_name = "data/markai.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=False)

def init_db():
    os.makedirs("data", exist_ok=True)
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session

