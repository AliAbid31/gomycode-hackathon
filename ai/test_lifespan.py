import asyncio
from brandforge.api.app import app, lifespan

async def run():
    print("Testing lifespan...")
    try:
        async with lifespan(app):
            print("Lifespan block active")
            print("Workflows:", app.state.workflows)
    except Exception as e:
        print("Error:", e)

asyncio.run(run())
