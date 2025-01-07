import pandas as pd

# Load your data
df = pd.read_csv("nutrition-4.csv")

# Unit expectations per column
expected_units = {
    "serving_size": "g",
    "total_fat": "g",
    "saturated_fat": "g",
    "cholesterol": "mg",
    "sodium": "mg",
    "choline": "mg",
    "vitamin_a": "mcg",
    "vitamin_b12": "mcg",
    "vitamin_b6": "mg",
    "vitamin_c": "mg",
    "vitamin_d": "mcg",
    "vitamin_e": "mg",
    "vitamin_k": "mcg",
    "calcium": "mg",
    "copper": "mg",
    "iron": "mg",
    "magnesium": "mg",
    "manganese": "mg",
    "phosphorous": "mg",
    "potassium": "mg",
    "zinc": "mg",
    "protein": "g",
    "glutamic_acid": "g",
    "glycine": "g",
    "carbohydrate": "g",
    "fiber": "g",
    "sugars": "g",
    "fructose": "g",
    "galactose": "g",
    "glucose": "g",
    "lactose": "g",
    "maltose": "g",
    "sucrose": "g",
    "fat": "g",
    "saturated_fatty_acids": "g",
    "fatty_acids_total_trans": "g",
    "alcohol": "g",
    "ash": "g",
    "caffeine": "mg",
    "water": "g",
}


def remove_units(df, units_dict):
    for column, unit in units_dict.items():
        if column in df.columns:
            # Convert the column to strings first, but only if it isn't already
            df[column] = df[column].astype(str)
            # Remove the unit string
            df[column] = df[column].str.replace(unit, "", regex=False)
            # Convert the cleaned column back to float
            df[column] = pd.to_numeric(df[column], errors='coerce')
    return df


# Remove units and convert to float
df = remove_units(df, expected_units)

# Save the cleaned data
df.to_csv("nutrition-5.csv", index=False)
