import os
import re

directories = ['src/views', 'src/components']

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Remove the bad min-width that was introduced
    content = re.sub(r'min-width:\s*100%;\s*\n\s*max-width:\s*\d+px;', r'', content)
    # Also clean up any empty lines left by it if possible, but regex might be tricky
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.vue'):
                process_file(os.path.join(root, file))
