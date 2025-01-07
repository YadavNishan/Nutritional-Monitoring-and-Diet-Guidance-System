import pandas as pd

df = pd.read_csv("nutrition-2.csv")

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
    "vitamin_d": "IU",
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

# subtract 4 for id, name, serving_size, calories
if len(expected_units) != (len(df.columns) - 3):
    print("Expected units and columns count mismatch")
    exit()


# Function to check missing units and count zeros
def check_units(df, column, expected_unit):
    # Count records that contain the expected unit
    has_unit = df[column].apply(
        lambda x: expected_unit in str(x) if pd.notna(x) else False
    )
    # Count records that are missing the unit
    missing_unit_count = len(df) - has_unit.sum()
    # Count records that are equal to 0
    # This handles all whitespace variations and coerces to numeric
    numeric_values = pd.to_numeric(df[column], errors="coerce")
    zero_count = (numeric_values == 0).sum()
    return missing_unit_count, zero_count


# Create a dictionary to store the counts for each column
missing_units_summary = {}

# Loop through each column and check for missing units and zero values
for column, expected_unit in expected_units.items():
    if column in df.columns:
        missing_count, zero_count = check_units(df, column, expected_unit)
        missing_units_summary[column] = {
            "missing_units": missing_count,
            "zero_values": zero_count,
        }

issue_column = []
# Print the summary of missing units and zero values for each column
for column, counts in missing_units_summary.items():
    print(f"Column '{column}':")
    print(f"  - Missing units: {counts['missing_units']}")
    print(f"  - Zero values: {counts['zero_values']}\n")
    if counts["missing_units"] != counts["zero_values"]:
        issue_column.append(column)

if len(issue_column) == 0:
    print("No issues found")
else:
    print("Columns with issues: ", *issue_column)
