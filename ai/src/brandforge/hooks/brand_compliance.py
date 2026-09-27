import logging

logger = logging.getLogger("brand_compliance")

def check_brand_compliance(run_output: any, run_context: dict) -> None:
    output_text = getattr(run_output, "content", str(run_output)).lower()
    
    # Example generic brand donts, real ones could come from brand_context
    brand_donts = [
        "cheap",
        "guaranteed",
        "miracle",
        "magic"
    ]
    
    violations = [word for word in brand_donts if word in output_text]
    if violations:
        logger.warning(f"Brand compliance warning: Output contains restricted terms: {', '.join(violations)}")
