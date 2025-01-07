from pinecone import Pinecone, ServerlessSpec
import os
from dotenv import load_dotenv

load_dotenv()

pinecone_api_key = os.getenv("PINECONE_API_KEY")
if pinecone_api_key == None:
    print("API Key not found")
    exit()
pc = Pinecone(api_key=pinecone_api_key)

index_name = "nutrition-index-1"
namespace = "iter5"

if pc.has_index(index_name) == False:
    pc.create_index(
        name=index_name,
        dimension=12,
        metric="cosine",  # model metric
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
