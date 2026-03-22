import os
import re

directories = ['src/views', 'src/components']

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Remove strict widths
    content = re.sub(r'width:\s*1200px;', r'width: 100%;\n  max-width: 1200px;', content)
    content = re.sub(r'min-width:\s*1200px;', r'/* min-width: 1200px; removed */', content)
    
    content = re.sub(r'width:\s*1180px;', r'width: 100%;\n  max-width: 1180px;', content)
    content = re.sub(r'min-width:\s*1180px;', r'/* min-width: 1180px; removed */', content)

    content = re.sub(r'width:\s*1300px;', r'width: 100%;\n  max-width: 1300px;', content)
    content = re.sub(r'min-width:\s*1300px;', r'/* min-width: 1300px; removed */', content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.vue'):
                process_file(os.path.join(root, file))
