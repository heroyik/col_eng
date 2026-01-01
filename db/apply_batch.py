import sys
import os

# Add db directory to path
db_path = r'c:\Users\heroy\COL_ENG\db'
sys.path.append(db_path)

import batch_update

if __name__ == "__main__":
    trans_file = r'c:\Users\heroy\COL_ENG\db\translations_batch_1.json'
    batch_update.update_chinese_from_file(trans_file)
