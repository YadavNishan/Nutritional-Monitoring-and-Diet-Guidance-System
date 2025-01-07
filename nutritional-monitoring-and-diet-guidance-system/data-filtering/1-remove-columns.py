import pandas as pd

# Load the CSV file
df = pd.read_csv("nutrition.csv")

# List of columns to remove
columns_to_remove = [
    "folate",
    "folic_acid",
    "niacin",
    "pantothenic_acid",
    "riboflavin",
    "thiamin",
    "cryptoxanthin_beta",
    "lutein_zeaxanthin",
    "lucopene",
    "tocopherol_alpha",
    "alanine",
    "arginine",
    "aspartic_acid",
    "cystine",
    "histidine",
    "hydroxyproline",
    "isoleucine",
    "leucine",
    "lysine",
    "methionine",
    "phenylalanine",
    "proline",
    "serine",
    "threonine",
    "tryptophan",
    "tyrosine",
    "valine",
    "theobromine",
    "carotene_alpha",
    "carotene_beta",
    "monounsaturated_fatty_acids",
    "polyunsaturated_fatty_acids",
    "vitamin_a",
    "selenium",
]

# Remove the columns
df.drop(columns=columns_to_remove, inplace=True)

columns_to_rename = {
    "vitamin_a_rae": "vitamin_a",
    "irom": "iron",
    "zink": "zinc",
}

# Rename the columns
df.rename(columns=columns_to_rename, inplace=True)

# Save the modified DataFrame to a new CSV file
df.to_csv("nutrition-1.csv", index=False)
