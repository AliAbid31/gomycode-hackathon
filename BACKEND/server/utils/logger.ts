export const logger = {
  info: (msg: string, meta?: any) => {
    console.log(`[MarkAi INFO] ${new Date().toISOString().slice(11, 19)} - ${msg}`, meta ? meta : '');
  },
  warn: (msg: string, meta?: any) => {
    console.warn(`[MarkAi WARN] ${new Date().toISOString().slice(11, 19)} - ${msg}`, meta ? meta : '');
  },
  error: (msg: string, error?: any) => {
    console.error(`[MarkAi ERROR] ${new Date().toISOString().slice(11, 19)} - ${msg}`, error ? error : '');
  },
  ai: (agentName: string, promptInfo: string) => {
    console.log(`[MarkAi AGENT] ⚡ ${agentName} triggered - ${promptInfo}`);
  }
};
