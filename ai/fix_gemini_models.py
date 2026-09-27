import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    new_content = content.replace('gemini-2.5-pro', 'gemini-3.1-pro-preview')
    new_content = new_content.replace('gemini-2.5-flash', 'gemini-3.1-flash-preview')

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src/brandforge'):
    for file in files:
        if file.endswith('.py'):
            process_file(os.path.join(root, file))

print("Done updating Gemini models.")
