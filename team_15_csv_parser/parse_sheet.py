import csv
import json
import os

# Ensure the 'data' folder exists
data_folder = 'data'
if not os.path.exists(data_folder):
    os.makedirs(data_folder)

# Function to convert CSV to JSON
def csv_to_json(csv_filename, json_filename):
    data = []

    with open(csv_filename, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)

    # Get the first key in the data
    first_key = next(iter(data[0].keys()))

    # Create the output dictionary
    output_data = {first_key: []}

    for entry in data:
        entry[first_key.upper()] = entry.pop(first_key)  # Change the "name" key to uppercase
        filtered_entry = {k: v for k, v in entry.items() if k and v}  # Filter out empty key-value pairs
        output_data[first_key].append(filtered_entry)

    with open(os.path.join(data_folder, json_filename), 'w') as json_file:
        json.dump(output_data, json_file, indent=4)

# Convert each CSV file to JSON
for filename in os.listdir('csv'):
    if filename.endswith('.csv'):
        csv_filename = os.path.join('csv', filename)
        json_filename = filename.replace('.csv', '.json')
        csv_to_json(csv_filename, json_filename)
        print(f'{csv_filename} has been converted and saved to data/{json_filename}.')
