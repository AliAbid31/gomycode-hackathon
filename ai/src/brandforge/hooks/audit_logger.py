import logging
import os

# Setup logger
log_dir = "data/logs"
os.makedirs(log_dir, exist_ok=True)
logging.basicConfig(
    filename=os.path.join(log_dir, "audit.log"),
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("brandforge_audit")

def audit_log_pre(run_input: str, run_context: dict, agent: any) -> None:
    session_id = getattr(agent, "session_id", "unknown_session")
    agent_name = getattr(agent, "name", "unknown_agent")
    input_str = str(run_input)
    input_summary = input_str[:100] + "..." if len(input_str) > 100 else input_str
    
    logger.info(f"PRE-RUN | Agent: {agent_name} | Session: {session_id} | Input: {input_summary}")

def audit_log_post(run_output: any, run_context: dict, agent: any) -> None:
    session_id = getattr(agent, "session_id", "unknown_session")
    agent_name = getattr(agent, "name", "unknown_agent")
    
    output_text = getattr(run_output, "content", str(run_output))
    out_len = len(output_text)
    
    metrics = getattr(run_output, "metrics", {})
    token_usage = metrics.get("total_tokens", "unknown") if isinstance(metrics, dict) else getattr(metrics, "total_tokens", "unknown")
    
    logger.info(f"POST-RUN | Agent: {agent_name} | Session: {session_id} | Output Length: {out_len} | Tokens: {token_usage}")
