import os
import re

replacements = [
    (r'#171a21', 'var(--c-bg-l0)'),
    (r'#1b2838', 'var(--c-bg-l1)'),
    (r'#16202d', 'var(--c-bg-l2)'),
    (r'#222e3b', 'var(--c-bg-l3)'),
    (r'#223447', 'var(--c-bg-l4)'),
    (r'#66c0f4', 'var(--c-primary)'),
    (r'#ffffff', 'var(--c-text-title)'),
    (r'#fff(?![a-zA-Z0-9])', 'var(--c-text-title)'),
    (r'#c6d4df', 'var(--c-text-body)'),
    (r'#c7d5e0', 'var(--c-text-body-alt)'),
    (r'#e6f3ff', 'var(--c-text-emphasis)'),
    (r'#8f98a0', 'var(--c-text-muted)'),
    (r'#8a9aa8', 'var(--c-text-label)'),
    (r'#b8b6b4', 'var(--c-text-nav)'),
    (r'#38424e', 'var(--c-border-default)'),
    (r'#3c4551', 'var(--c-border-hover)'),
    (r'#2a475e', 'var(--c-border-strong)'),
    (r'#2a2e36', 'var(--c-border-strong)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.06\)', 'var(--c-primary-alpha-10)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.08\)', 'var(--c-primary-alpha-10)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.10\)', 'var(--c-primary-alpha-10)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.1\)', 'var(--c-primary-alpha-10)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.12\)', 'var(--c-primary-alpha-10)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.16\)', 'var(--c-primary-alpha-20)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.20\)', 'var(--c-primary-alpha-20)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.2\)', 'var(--c-primary-alpha-20)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.22\)', 'var(--c-primary-alpha-20)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.30\)', 'var(--c-primary-alpha-30)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.40\)', 'var(--c-primary-alpha-40)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.42\)', 'var(--c-primary-alpha-40)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.50\)', 'var(--c-primary-alpha-50)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.60\)', 'var(--c-primary-alpha-60)'),
    (r'rgba\(102,\s*192,\s*244,\s*0\.80\)', 'var(--c-primary-alpha-80)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.20\)', 'var(--c-shadow-light)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.2\)', 'var(--c-shadow-light)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.35\)', 'var(--c-shadow-medium)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.40\)', 'var(--c-shadow-medium)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.4\)', 'var(--c-shadow-medium)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.50\)', 'var(--c-shadow-heavy)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.5\)', 'var(--c-shadow-heavy)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.60\)', 'var(--c-shadow-heavy)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.6\)', 'var(--c-shadow-heavy)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.08\)', 'var(--c-primary-alpha-10)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.16\)', 'var(--c-primary-alpha-20)'),
    (r'rgba\(23,\s*26,\s*33,\s*0\.9\)', 'var(--c-nav-bg)'),
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
