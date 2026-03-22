import os
import re

directories = ['src/views', 'src/components']

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # We want to find classes that have "width: 100%;" but not "box-sizing: border-box;"
    # Actually, let's just globally add box-sizing: border-box; to root page classes if they don't have it
    # Easier way: just add * { box-sizing: border-box; } ? No, scoped CSS.
    
    pass

