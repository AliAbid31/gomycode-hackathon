export const formatResponse = {
  success: <T>(data: T, message = 'Success') => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  }),
  error: (message: string, code = 400, details?: any) => ({
    success: false,
    message,
    code,
    details,
    timestamp: new Date().toISOString()
  })
};
