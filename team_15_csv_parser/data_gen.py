import json
import os

# Directory containing JSON files
json_dir = 'data'

# Output JSON file
output_json_file = 'data.json'

# List of JSON files to combine
json_files = [file for file in os.listdir(json_dir) if file.endswith('.json') and file != 'sheet.json']

# Initialize the combined data dictionary
combined_data = {}

# Iterate over JSON files and merge them into the combined data
for json_file in json_files:
    with open(os.path.join(json_dir, json_file), 'r') as file:
        data = json.load(file)
        for key, value in data.items():
            if key in combined_data:
                combined_data[key] += value
            else:
                combined_data[key] = value

# Write the combined data to the output JSON file
with open(output_json_file, 'w') as out_file:
    json.dump(combined_data, out_file, indent=4)

print(f'Combined data has been saved to {output_json_file}.')
