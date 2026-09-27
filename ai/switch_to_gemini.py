import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    content = content.replace('from agno.models.openai import OpenAIChat', 'from agno.models.google import Gemini')
    content = content.replace('OpenAIChat(id="gpt-4o")', 'Gemini(id="gemini-2.5-pro")')
    content = content.replace('OpenAIChat(id="gpt-4o-mini")', 'Gemini(id="gemini-2.5-flash")')
    
    # Embedder replacements
    content = content.replace('from agno.knowledge.embedder.openai import OpenAIEmbedder', 'from agno.knowledge.embedder.google import GeminiEmbedder')
    content = content.replace('OpenAIEmbedder(id="text-embedding-3-small")', 'GeminiEmbedder(id="models/text-embedding-004")')

    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src/brandforge'):
    for file in files:
        if file.endswith('.py'):
            process_file(os.path.join(root, file))

print("Switched all agent and knowledge files to Gemini.")
