import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
from pymongo import AsyncMongoClient


# ============================================================
# Load environment variables
# ============================================================

load_dotenv()


# ============================================================
# MongoDB credentials
# ============================================================

MONGODB_USERNAME = os.getenv("MONGODB_USERNAME")
MONGODB_PASSWORD = os.getenv("MONGODB_PASSWORD")


if not MONGODB_USERNAME:
    raise RuntimeError(
        "❌ MONGODB_USERNAME is missing in .env"
    )

if not MONGODB_PASSWORD:
    raise RuntimeError(
        "❌ MONGODB_PASSWORD is missing in .env"
    )


# ============================================================
# URL encode username and password
# This prevents problems with special characters
# ============================================================

username = quote_plus(MONGODB_USERNAME)
password = quote_plus(MONGODB_PASSWORD)


# ============================================================
# MongoDB Atlas URI
# ============================================================

MONGODB_URI = (
    f"mongodb+srv://{username}:{password}"
    f"@cluster0.nml3k20.mongodb.net/"
    f"predicthub"
    f"?retryWrites=true&w=majority"
)


# ============================================================
# MongoDB client
# ============================================================

client = AsyncMongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=30000,
)


# ============================================================
# Database
# ============================================================

db = client["predicthub"]
collection = db["admin"]  # Specify the collection name for admin data


# ============================================================
# Connect to MongoDB
# ============================================================

async def connect_to_database():

    try:

        # Ping MongoDB Atlas
        await client.admin.command("ping")

        print("========================================")
        print("✅ MongoDB connected successfully")
        print("📦 Database: predicthub")
        print("========================================")

    except Exception as e:

        print("========================================")
        print("❌ MongoDB connection failed")
        print(f"Error: {e}")
        print("========================================")

        raise


# ============================================================
# Close MongoDB
# ============================================================

async def close_database():

    await client.close()

    print("🔌 MongoDB connection closed")