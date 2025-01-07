import pandas as pd

# Load your data
data = pd.read_csv("nutrition-2.csv")

# Conversion factor for vitamin_d is 0.4
conversion_factor = 0.4

# Convert vitamin_d from IU to mcg
data["vitamin_d"] = data["vitamin_d"].str.replace(" IU", "").astype(float) * conversion_factor

data.to_csv("nutrition-4.csv", index=False)
