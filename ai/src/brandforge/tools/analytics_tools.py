import json
import logging
import pandas as pd
import numpy as np

from agno.tools import Toolkit

logger = logging.getLogger(__name__)

class AnalyticsToolkit(Toolkit):
    def __init__(self, **kwargs):
        super().__init__(name="analytics_toolkit", **kwargs)
        
        self.register(self.calculate_engagement_rate)
        self.register(self.compute_content_score)
        self.register(self.generate_performance_summary)
        self.register(self.compare_periods)
        self.register(self.identify_best_posting_times)
        self.register(self.calculate_roi)
        self.register(self.detect_trends)

    def calculate_engagement_rate(self, likes: int, comments: int, shares: int, impressions: int) -> str:
        """
        Computes engagement rate.
        """
        if impressions == 0:
            return json.dumps({"error": "Impressions cannot be zero."})
            
        rate = ((likes + comments + shares) / impressions) * 100
        return json.dumps({"engagement_rate": round(rate, 2)})

    def compute_content_score(self, engagement_data_json: str) -> str:
        """
        Scores content 0-100 based on multiple factors.
        """
        try:
            data = json.loads(engagement_data_json)
            df = pd.DataFrame([data])
            
            # Simple scoring logic
            score = 0
            if "engagement_rate" in df.columns:
                score += min(df['engagement_rate'][0] * 10, 50)
            if "ctr" in df.columns:
                score += min(df['ctr'][0] * 20, 50)
                
            return json.dumps({"content_score": round(min(score, 100), 2)})
        except Exception as e:
            return json.dumps({"error": str(e)})

    def generate_performance_summary(self, metrics_json: str) -> str:
        """
        Creates a formatted performance summary.
        """
        try:
            data = json.loads(metrics_json)
            df = pd.DataFrame([data])
            summary = df.describe().to_dict()
            return json.dumps({"summary": summary})
        except Exception as e:
            return json.dumps({"error": str(e)})

    def compare_periods(self, current_metrics_json: str, previous_metrics_json: str) -> str:
        """
        Period-over-period comparison.
        """
        try:
            current = json.loads(current_metrics_json)
            previous = json.loads(previous_metrics_json)
            
            comparison = {}
            for k in current.keys():
                if k in previous and isinstance(current[k], (int, float)):
                    if previous[k] == 0:
                        comparison[f"{k}_growth"] = 0
                    else:
                        comparison[f"{k}_growth"] = round(((current[k] - previous[k]) / previous[k]) * 100, 2)
            return json.dumps({"comparison": comparison})
        except Exception as e:
            return json.dumps({"error": str(e)})

    def identify_best_posting_times(self, historical_data_json: str) -> str:
        """
        Analyzes best times to post.
        """
        try:
            # Assuming historical_data is a list of dicts with 'time' and 'engagement'
            data = json.loads(historical_data_json)
            df = pd.DataFrame(data)
            
            if 'time' not in df.columns or 'engagement' not in df.columns:
                return json.dumps({"error": "Required columns 'time' and 'engagement' not found."})
                
            best = df.loc[df['engagement'].idxmax()]
            return json.dumps({"best_time": best['time'], "max_engagement": best['engagement']})
        except Exception as e:
            return json.dumps({"error": str(e)})

    def calculate_roi(self, ad_spend: float, revenue: float, conversions: int) -> str:
        """
        ROI calculation.
        """
        if ad_spend == 0:
            return json.dumps({"error": "Ad spend cannot be zero."})
            
        roi = ((revenue - ad_spend) / ad_spend) * 100
        cpa = ad_spend / conversions if conversions > 0 else 0
        return json.dumps({
            "roi": round(roi, 2),
            "cpa": round(cpa, 2)
        })

    def detect_trends(self, metrics_series_json: str) -> str:
        """
        Identifies upward/downward trends.
        """
        try:
            # list of values representing a time series
            data = json.loads(metrics_series_json)
            if not isinstance(data, list) or len(data) < 2:
                return json.dumps({"trend": "insufficient data"})
                
            df = pd.Series(data)
            trend = "upward" if df.iloc[-1] > df.iloc[0] else "downward"
            if abs(df.iloc[-1] - df.iloc[0]) < (df.mean() * 0.05):
                trend = "flat"
                
            return json.dumps({"trend": trend})
        except Exception as e:
            return json.dumps({"error": str(e)})
