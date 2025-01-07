import pandas as pd

# Load your dataset
data = pd.read_csv('nutrition-1.csv')

# Define columns to exclude from the replacement
exclude_columns = ['id', 'name', 'serving_size']

# Get columns that are not in the exclude list
columns_to_replace = data.columns.difference(exclude_columns)

# Replace NaN values with 0 in selected columns
data[columns_to_replace] = data[columns_to_replace].fillna(0)

# Save the updated DataFrame to a new CSV
data.to_csv('nutrition-2.csv', index=False)
