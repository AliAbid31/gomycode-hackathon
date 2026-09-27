from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: Optional[str] = None
    ANTHROPIC_API_KEY: Optional[str] = None
    TAVILY_API_KEY: Optional[str] = None
    FAL_KEY: Optional[str] = None
    FIRECRAWL_API_KEY: Optional[str] = None
    
    # Meta
    META_APP_ID: Optional[str] = None
    META_APP_SECRET: Optional[str] = None
    META_ACCESS_TOKEN: Optional[str] = None
    
    # Auth & DB
    JWT_SECRET: str = "secret"
    DATABASE_URL: str = "sqlite:///brandforge.db"
    
    # Models
    DEFAULT_LLM_MODEL: str = "gpt-4o"
    DEFAULT_IMAGE_MODEL: str = "dall-e-3"
    
    # Config
    MAX_RETRIES: int = 3
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
