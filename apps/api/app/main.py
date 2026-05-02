from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, verify_connection
from app.domains.health.router import router as health_router

app = FastAPI(title="JBFastMVP API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    verify_connection()
    Base.metadata.create_all(bind=engine)


app.include_router(health_router)
