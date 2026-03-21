import os
import re

files_with_back_btn = [
    'src/views/Records/RecordDetail.vue',
    'src/views/MySpace/Car/CarsHome.vue',
    'src/views/MySpace/Car/Cars.vue',
    'src/views/MySpace/Car/CarBasicsDetail.vue',
    'src/views/MySpace/Car/BrandDetail.vue',
    'src/views/MySpace/Car/BrandList.vue',
    'src/views/MySpace/Car/CarDetail.vue',
    'src/views/MySpace/Car/CarBasics.vue',
    'src/views/MySpace/Photography/Photography.vue',
    'src/views/MySpace/Digital/Digital.vue',
    'src/views/Learning/IeltsLearning.vue',
    'src/views/Learning/ProKnLearning.vue',
    'src/views/Learning/ProKnDetail.vue'
]

def replace_router_link(match):
    attrs = match.group(1)
    inner = match.group(2)
    to_match = re.search(r':?to="([^"]+)"|\'([^\']+)\'', attrs)
    if to_match:
        to_val = to_match.group(1) or to_match.group(2)
        attrs_clean = re.sub(r'\s*:?to=(?:"[^"]*"|\'[^\']*\')', '', attrs)
        if 'to=' in attrs and not ':to=' in attrs:
            return f'<button {attrs_clean} @click="$router.push(\'{to_val}\')">{inner}</button>'
        else:
            return f'<button {attrs_clean} @click="$router.push({to_val})">{inner}</button>'
    return match.group(0)

def replace_a(match):
    attrs = match.group(1)
    inner = match.group(2)
    href_match = re.search(r'href="([^"]+)"', attrs)
    attrs_clean = re.sub(r'\s*href="[^"]*"', '', attrs)
    if href_match:
        href_val = href_match.group(1)
        if href_val == '#' or href_val == '':
            return f'<button {attrs_clean} @click="$router.go(-1)">{inner}</button>'
        elif href_val.startswith('#/'):
            path = href_val[1:]
            return f'<button {attrs_clean} @click="$router.push(\'{path}\')">{inner}</button>'
    return f'<button {attrs} @click="$router.go(-1)">{inner}</button>'

for filepath in files_with_back_btn:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    
    # 1. router-link
    content = re.sub(r'<router-link\s+([^>]*class="[^"]*back-btn[^"]*"[^>]*)>(.*?)</router-link>', replace_router_link, content, flags=re.DOTALL)
    
    # 2. <a> tag
    content = re.sub(r'<a\s+([^>]*class="[^"]*back-btn[^"]*"[^>]*)>(.*?)</a>', replace_a, content, flags=re.DOTALL)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated HTML tags for {filepath}")
