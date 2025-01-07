import os
import pandas as pd
from dotenv import load_dotenv
from pinecone import Pinecone

# Load environment variables from .env
load_dotenv()

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Define the index name and namespace
index_name = "nutrition-index-1"
namespace = "iter5"

# Connect to the existing index
index = pc.Index(index_name)

# Load the pre-normalized nutrition data
data = pd.read_csv("nutrition-6.csv")

# Select the relevant columns
selected_columns = [
    "id",
    "calories",
    "carbohydrate",
    "total_fat",
    "cholesterol",
    "protein",
    "fiber",
    "sugars",
    "sodium",
    "vitamin_d",
    "calcium",
    "iron",
    "caffeine",
]
filtered_data = data[selected_columns]

# Upsert data into Pinecone (id as the vector id, and the rest as the vector values)
# Use a list comprehension to create the list of tuples for upsert
upsert_data = [
    (str(row["id"]), row[1:].tolist())  # Create tuple of (id, values)
    for index, row in filtered_data.iterrows()
]

# Split the data into chunks of 1000 coz pinecone upserts only 1000 vectors at a time
batch_size = 1000
for i in range(0, len(upsert_data), batch_size):
    batch = upsert_data[i : i + batch_size]
    index.upsert(batch, namespace=namespace)
    print("Upserted batch:", i)

print(f"Data has been successfully upserted into Pinecone namespace: {namespace}")
