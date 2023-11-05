# README

## Directory Structure

```kotlin
.
├── csv
│   ├── addons.csv
│   ├── basic.csv
│   ├── combos.csv
│   ├── insaniteas.csv
│   ├── more.csv
│   ├── sheet.csv
│   └── supa.csv
├── data
│   ├── addons.json
│   ├── basic.json
│   ├── combos.json
│   ├── insaniteas.json
│   ├── more.json
│   ├── sheet.json
│   └── supa.json
├── data.json
├── data_gen.py
├── move_files.sh
├── parse_sheet.py
└── readme.md

```

This directory contains various files and scripts for managing and processing data in CSV and JSON formats.

## File Descriptions

* **csv**: This directory contains CSV files, each representing different data sets.

* **data**: This directory stores JSON files, which are generated from the corresponding CSV files.

* **data.json**: This is the combined JSON file that contains data from all JSON files in the 'data' directory. The 'sheet.json' file is excluded.

* **data_gen.py**: Python script for generating JSON files from CSV files in the 'csv' directory and combining them into 'data.json'.

* **move_files**.sh: Bash script for organizing the files into directories. It moves CSV files to the 'csv' directory and JSON files to the 'data' directory.

* **parse_sheet.py**: Python script for converting the 'sheet.csv' file into 'sheet.json'.

# Usage

1. Place your CSV files in the 'csv' directory.

2. Run the 'move_files.sh' script to organize the files into the correct directories. It will move CSV files to the 'csv' directory and JSON files to the 'data' directory.

3. Run 'parse_sheet.py' to convert 'sheet.csv' into 'sheet.json'.

4. Run 'data_gen.py' to generate JSON files from CSV files in the 'csv' directory and combine them into 'data.json' (excluding 'sheet.json').

5. The final combined data can be found in 'data.json'.

This setup allows you to efficiently manage, process, and organize your data in CSV and JSON formats within this directory structure.