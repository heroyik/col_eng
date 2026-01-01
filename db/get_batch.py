import json
import os
import sys

def get_batch(start, end):
    f_path = r'c:\Users\heroy\COL_ENG\db\20260101_COL_ENG_1484_backupjson'
    with open(f_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    batch = data[start:end]
    output = [{ 'id': b['id'], 'primary': b['primary'] } for b in batch]
    print(json.dumps(output, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) == 3:
        get_batch(int(sys.argv[1]), int(sys.argv[2]))
