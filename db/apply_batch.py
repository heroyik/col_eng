import sys
import os

# Setup paths relative to the script location
script_dir = os.path.dirname(os.path.abspath(__file__))
db_path = script_dir
sys.path.append(db_path)

import batch_update

if __name__ == "__main__":
    trans_file = os.path.join(db_path, 'translations_batch_1.json')
    batch_update.update_chinese_from_file(trans_file)
