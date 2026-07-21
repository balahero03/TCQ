import re

def add_extensions(filepath, is_jsx=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if is_jsx:
        # In IntroAnimation.jsx, it's inside <motion.path d="..."
        pattern = r'(d=")M 560\.361 811\.733(.*?882\.470 1081\.007)(")'
        replacement = r'\1M -1000 1078 L 35.5 1078 M 560.361 811.733\2 M 1010 1054.129 L 2000 1054.129\3'
    else:
        # In Hero.jsx, it's const CAT_PATH = "..."
        pattern = r'(const CAT_PATH = ")M 560\.361 811\.733(.*?882\.470 1081\.007)(")'
        replacement = r'\1M -1000 1078 L 35.5 1078 M 560.361 811.733\2 M 1010 1054.129 L 2000 1054.129\3'
        
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Successfully updated {filepath}')
    else:
        print(f'Failed to update {filepath} (No match found or already updated)')

add_extensions('src/components/Hero.jsx', is_jsx=False)
add_extensions('src/components/IntroAnimation.jsx', is_jsx=True)
