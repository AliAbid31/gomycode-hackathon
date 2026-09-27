import json
import logging
from typing import Optional

import httpx
from agno.tools import Toolkit

logger = logging.getLogger(__name__)

class MetaAdsToolkit(Toolkit):
    def __init__(self, access_token: str, ad_account_id: str, api_version: str = "v20.0", **kwargs):
        super().__init__(name="meta_ads_toolkit", **kwargs)
        self.access_token = access_token
        self.ad_account_id = ad_account_id
        self.api_version = api_version
        self.base_url = f"https://graph.facebook.com/{self.api_version}"
        
        self.register(self.create_campaign)
        self.register(self.create_ad_set)
        self.register(self.create_ad_creative)
        self.register(self.get_campaign_insights)
        self.register(self.update_campaign_status)
        self.register(self.get_ad_account_overview)
        self.register(self.optimize_budget)

    def _make_request(self, method: str, endpoint: str, **kwargs) -> dict:
        url = f"{self.base_url}/{endpoint}"
        params = kwargs.pop("params", {})
        params["access_token"] = self.access_token
        try:
            with httpx.Client() as client:
                response = client.request(method, url, params=params, **kwargs)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP Error: {e.response.text}"}
        except Exception as e:
            return {"error": f"Request failed: {str(e)}"}

    def create_campaign(self, name: str, objective: str, budget: float, targeting_description: str) -> str:
        """
        Creates a Meta Ads campaign.
        
        Args:
            name (str): Campaign name.
            objective (str): Campaign objective (e.g., OUTCOME_TRAFFIC, OUTCOME_SALES).
            budget (float): Lifetime or daily budget amount.
            targeting_description (str): Description of targeting.
            
        Returns:
            str: JSON string with campaign ID or error.
        """
        data = {
            "name": name,
            "objective": objective,
            "status": "PAUSED",
            "special_ad_categories": ["NONE"]
        }
        res = self._make_request("POST", f"act_{self.ad_account_id}/campaigns", json=data)
        return json.dumps(res)

    def create_ad_set(self, campaign_id: str, name: str, budget: float, targeting_json: str) -> str:
        """
        Creates an ad set within a campaign.
        
        Args:
            campaign_id (str): ID of the campaign.
            name (str): Ad set name.
            budget (float): Daily budget.
            targeting_json (str): JSON string containing targeting specs.
            
        Returns:
            str: JSON string with ad set ID or error.
        """
        data = {
            "campaign_id": campaign_id,
            "name": name,
            "daily_budget": int(budget * 100), # Assuming budget is in minor units for API
            "targeting": json.loads(targeting_json),
            "status": "PAUSED",
            "billing_event": "IMPRESSIONS",
            "optimization_goal": "REACH"
        }
        res = self._make_request("POST", f"act_{self.ad_account_id}/adsets", json=data)
        return json.dumps(res)

    def create_ad_creative(self, ad_set_id: str, headline: str, primary_text: str, image_url: str, cta: str) -> str:
        """
        Creates ad creative.
        
        Args:
            ad_set_id (str): Ad set ID.
            headline (str): Ad headline.
            primary_text (str): Main body text.
            image_url (str): URL of the ad image.
            cta (str): Call to action type (e.g., LEARN_MORE).
            
        Returns:
            str: JSON string with ad creative ID or error.
        """
        # Normally involves creating an image hash first, then creative. Sticking to simplified mock/call structure.
        data = {
            "name": headline,
            "object_story_spec": {
                "page_id": "YOUR_PAGE_ID", # Assuming page ID is known or passed
                "link_data": {
                    "image_url": image_url,
                    "link": "https://example.com",
                    "message": primary_text,
                    "call_to_action": {"type": cta}
                }
            }
        }
        res = self._make_request("POST", f"act_{self.ad_account_id}/adcreatives", json=data)
        return json.dumps(res)

    def get_campaign_insights(self, campaign_id: str, date_preset: str = "last_30d") -> str:
        """
        Fetches campaign performance metrics.
        
        Args:
            campaign_id (str): Campaign ID.
            date_preset (str): Date range preset.
            
        Returns:
            str: JSON string with insights.
        """
        params = {
            "date_preset": date_preset,
            "fields": "impressions,clicks,spend,cpc,ctr"
        }
        res = self._make_request("GET", f"{campaign_id}/insights", params=params)
        return json.dumps(res)

    def update_campaign_status(self, campaign_id: str, status: str) -> str:
        """
        Pause or activate campaigns.
        
        Args:
            campaign_id (str): Campaign ID.
            status (str): ACTIVE or PAUSED.
            
        Returns:
            str: JSON string with result.
        """
        data = {"status": status}
        res = self._make_request("POST", campaign_id, json=data)
        return json.dumps(res)

    def get_ad_account_overview(self) -> str:
        """
        Account-level spend and performance summary.
        
        Returns:
            str: JSON string with account overview.
        """
        params = {
            "date_preset": "last_30d",
            "fields": "spend,impressions,clicks"
        }
        res = self._make_request("GET", f"act_{self.ad_account_id}/insights", params=params)
        return json.dumps(res)

    def optimize_budget(self, campaign_id: str, new_budget: float) -> str:
        """
        Adjust campaign budget.
        
        Args:
            campaign_id (str): Campaign ID.
            new_budget (float): New budget amount.
            
        Returns:
            str: JSON string with update result.
        """
        data = {"daily_budget": int(new_budget * 100)}
        res = self._make_request("POST", campaign_id, json=data)
        return json.dumps(res)
