import json
import os

DB_PATH = r'c:\Users\heroy\COL_ENG\db\20260101_COL_ENG_1484_backupjson'

def load_db():
    with open(DB_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_db(data):
    with open(DB_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_batch(start_idx, size=50):
    data = load_db()
    return data[start_idx : start_idx + size]

def update_chinese_from_file(trans_path):
    with open(trans_path, 'r', encoding='utf-8') as f:
        translations = json.load(f)
    # Convert keys to int if they are strings
    translations = {int(k): v for k, v in translations.items()}
    
    data = load_db()
    for item in data:
        item_id = item.get('id')
        if item_id in translations:
            item['chinese'] = translations[item_id]
    save_db(data)
    print(f"Updated {len(translations)} records.")

if __name__ == "__main__":
    # This script is intended to be used via run_command with python -c or as a module
    pass
