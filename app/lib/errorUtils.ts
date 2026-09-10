/**
 * Utility to format backend API errors into clean, user-friendly SaaS messages
 * Ensures no internal URLs, endpoints, or debug info are exposed to the user.
 */
export function formatApiError(err: any): string {
  if (err?.status === 409) {
    return "An account with this email address already exists. Please sign in or use a different email.";
  }
  if (err?.status === 401) {
    return "Invalid credentials. Please verify your email and password.";
  }
  if (err?.status === 403) {
    return "Access restricted. You do not have permission to perform this action.";
  }
  if (err?.status === 404) {
    return "Account or resource not found. Please check your information.";
  }
  if (err?.status === 429) {
    return "Too many requests. Please wait a moment before trying again.";
  }
  if (err?.status === 400) {
    const raw = err?.data?.message;
    if (raw && typeof raw === 'string' && !raw.includes('/api/') && !raw.includes('http') && !raw.includes('endpoint')) {
      return raw;
    }
    return "Invalid input data. Please check all required fields and try again.";
  }
  if (err?.status >= 500) {
    return "The server is temporarily unavailable. Please try again shortly.";
  }
  if (err?.message?.includes('Failed to fetch') || err?.message?.includes('NetworkError') || err?.message?.includes('network')) {
    return "Network error: Unable to reach the authentication server. Please check your connection.";
  }
  
  const rawMsg = err?.data?.message || err?.message;
  if (rawMsg && typeof rawMsg === 'string' && !rawMsg.includes('/api/') && !rawMsg.includes('http') && !rawMsg.includes('POST') && !rawMsg.includes('GET')) {
    return rawMsg;
  }
  
  return "Unable to complete request. Please verify your details and try again.";
}
