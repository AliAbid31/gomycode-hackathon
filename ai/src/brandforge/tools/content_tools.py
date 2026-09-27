import json
import logging
import random
from typing import List

from agno.tools import Toolkit

logger = logging.getLogger(__name__)

PLATFORM_LIMITS = {
    "instagram": {"max_chars": 2200, "max_hashtags": 30},
    "twitter": {"max_chars": 280, "max_hashtags": 5},
    "linkedin": {"max_chars": 3000, "max_hashtags": 10},
    "facebook": {"max_chars": 63206, "max_hashtags": 10}
}

class ContentToolkit(Toolkit):
    def __init__(self, **kwargs):
        super().__init__(name="content_toolkit", **kwargs)
        
        self.register(self.generate_hashtags)
        self.register(self.format_caption)
        self.register(self.create_hook)
        self.register(self.suggest_cta)
        self.register(self.get_platform_best_practices)
        self.register(self.create_content_variations)
        self.register(self.analyze_caption_quality)

    def generate_hashtags(self, topic: str, platform: str, count: int) -> str:
        """Generates relevant hashtags."""
        platform = platform.lower()
        limits = PLATFORM_LIMITS.get(platform, {"max_hashtags": 10})
        count = min(count, limits["max_hashtags"])
        
        # Simple rule-based generation
        words = topic.split()
        hashtags = [f"#{w.capitalize()}" for w in words if len(w) > 3]
        hashtags += [f"#{topic.replace(' ', '')}", f"#{platform}Marketing", "#BrandForge"]
        
        return json.dumps({"hashtags": hashtags[:count]})

    def format_caption(self, raw_text: str, platform: str, include_hashtags: bool, include_cta: bool) -> str:
        """Formats caption per platform rules."""
        platform = platform.lower()
        limits = PLATFORM_LIMITS.get(platform, {"max_chars": 1000, "max_hashtags": 5})
        
        formatted = raw_text.strip()
        
        if include_cta:
            cta_obj = json.loads(self.suggest_cta("general", platform))
            formatted += f"\n\n{cta_obj.get('cta', 'Check the link in bio!')}"
            
        if include_hashtags:
            hashtags_obj = json.loads(self.generate_hashtags("marketing update", platform, limits["max_hashtags"]))
            formatted += "\n\n" + " ".join(hashtags_obj["hashtags"])
            
        # Truncate to limit if needed
        if len(formatted) > limits["max_chars"]:
            formatted = formatted[:limits["max_chars"]-3] + "..."
            
        return json.dumps({"formatted_caption": formatted, "length": len(formatted)})

    def create_hook(self, topic: str, style: str, platform: str) -> str:
        """Generates attention-grabbing hooks."""
        hooks = {
            "question": f"Did you know this about {topic}?",
            "stat": f"90% of people get {topic} wrong. Here's why.",
            "story": f"Let me tell you a story about {topic}...",
            "direct": f"Here is exactly how to dominate {topic}."
        }
        selected = hooks.get(style.lower(), hooks["direct"])
        return json.dumps({"hook": selected})

    def suggest_cta(self, objective: str, platform: str) -> str:
        """Suggests call-to-action."""
        ctas = {
            "traffic": "Click the link in bio to learn more! \ud83d\udc47",
            "engagement": "What are your thoughts? Drop a comment below! \ud83d\udcac",
            "sales": "Shop now before the sale ends! \ud83d\uded2",
            "general": "Follow for more tips!"
        }
        return json.dumps({"cta": ctas.get(objective.lower(), ctas["general"])})

    def get_platform_best_practices(self, platform: str) -> str:
        """Character limits, best times, formats per platform."""
        platform = platform.lower()
        if platform not in PLATFORM_LIMITS:
            return json.dumps({"error": f"Unknown platform: {platform}"})
            
        return json.dumps({
            "platform": platform,
            "limits": PLATFORM_LIMITS[platform],
            "tips": "Tailor content to your audience and post consistently."
        })

    def create_content_variations(self, original_caption: str, num_variations: int) -> str:
        """Creates A/B test variations."""
        variations = []
        for i in range(num_variations):
            if i % 2 == 0:
                variations.append(f"NEW: {original_caption}")
            else:
                variations.append(f"{original_caption} (Updated!)")
        return json.dumps({"variations": variations})

    def analyze_caption_quality(self, caption: str) -> str:
        """Scores caption readability, emoji use, CTA presence."""
        score = 100
        issues = []
        
        if len(caption) < 20:
            score -= 20
            issues.append("Caption is too short.")
            
        emoji_count = sum(1 for char in caption if char in "\ud83d\ude00\ud83d\ude0a\ud83d\ude42") # simplified emoji check
        if emoji_count > 5:
            score -= 10
            issues.append("Too many emojis.")
            
        if "?" not in caption and "!" not in caption:
            score -= 10
            issues.append("Missing engaging punctuation (e.g., question marks, exclamation points).")
            
        return json.dumps({
            "score": max(score, 0),
            "issues": issues,
            "length": len(caption)
        })
