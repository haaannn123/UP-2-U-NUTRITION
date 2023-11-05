#!/bin/bash

# Create the 'csv' and 'data' directories if they don't exist
mkdir -p csv data

# Move CSV files to the 'csv' directory
mv *.csv csv/

# Move JSON files to the 'data' directory
mv *.json data/

echo "CSV files have been moved to 'csv/' and JSON files to 'data/'."
