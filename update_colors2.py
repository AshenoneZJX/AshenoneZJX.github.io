import os
import re

replacements = [
    (r'#0f1a24', 'var(--c-bg-panel-deep)'),
    (r'#0f1924', 'var(--c-bg-input)'),
    (r'#2a3f54', 'var(--c-bg-l3)'),
    (r'#acb2b8', 'var(--c-text-muted)'),
    (r'#aebdc9', 'var(--c-text-muted)'),
    (r'#9cc9f5', 'var(--c-primary)'),
    (r'#67c1f5', 'var(--c-primary)'),
    (r'#666(?![a-zA-Z0-9])', 'var(--c-text-muted)'),
]

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.vue') or file.endswith('.css'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            for pattern, replacement in replacements:
                content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
                
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
