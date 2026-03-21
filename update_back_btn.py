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

unified_css = '''
.back-btn {
  background: transparent;
  border: 1px solid var(--c-border-strong);
  color: var(--c-text-body-alt);
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto; /* Ensure right alignment in flex container */
  transition: all 0.2s ease;
  text-decoration: none;
}
.back-icon {
  width: 16px;
  height: 16px;
  display: block;
}
.back-btn:hover {
  color: var(--c-text-emphasis);
  background: var(--c-primary-alpha-10);
  border-color: var(--c-border-hover);
}
.back-btn:active, .back-btn.router-link-active {
  background: var(--c-bg-l1);
  border-color: var(--c-primary);
  color: var(--c-text-title);
}
'''

for filepath in files_with_back_btn:
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    
    # Remove old CSS blocks
    content = re.sub(r'\.back-btn\s*\{[^}]*\}', '', content)
    content = re.sub(r'\.back-icon\s*\{[^}]*\}', '', content)
    content = re.sub(r'\.back-btn:hover\s*\{[^}]*\}', '', content)
    content = re.sub(r'\.back-btn:active(?:,\s*\.back-btn\.router-link-active)?\s*\{[^}]*\}', '', content)
    
    # Insert new CSS block right after <style scoped> or <style>
    content = re.sub(r'(<style[^>]*>)', r'\1' + unified_css, content, count=1)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
