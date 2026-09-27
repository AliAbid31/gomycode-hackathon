import re
from agno.exceptions import StopAgentRun

def input_safety_guardrail(run_input: str, run_context: dict) -> None:
    if not isinstance(run_input, str):
        return
        
    if len(run_input) > 10000:
        raise StopAgentRun("Input exceeds maximum allowed length of 10000 characters.")
        
    lower_input = run_input.lower()
    suspicious_patterns = [
        "ignore previous",
        "system prompt",
        "forget all instructions",
        "you are a newly created",
    ]
    
    for pattern in suspicious_patterns:
        if pattern in lower_input:
            raise StopAgentRun("Prompt injection attempt detected. Input rejected.")
            
    if "<script>" in lower_input or "javascript:" in lower_input:
        raise StopAgentRun("Potential script injection detected. Input rejected.")

def output_safety_guardrail(run_output: any, run_context: dict) -> None:
    output_text = getattr(run_output, "content", str(run_output))
    if not output_text:
        return
        
    if not isinstance(output_text, str):
        return
        
    # Basic API key redaction pattern
    api_key_pattern = r"(?i)(sk-[a-zA-Z0-9]{32,}|xox[bap]-[a-zA-Z0-9]{10,})"
    if re.search(api_key_pattern, output_text):
        redacted = re.sub(api_key_pattern, "[REDACTED_API_KEY]", output_text)
        if hasattr(run_output, "content"):
            run_output.content = redacted
        
    if len(output_text.strip()) == 0:
        raise StopAgentRun("Agent returned empty output.")
