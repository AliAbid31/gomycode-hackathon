const API_BASE = '/api';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface AuthResult {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'marketing' | 'creative';
    createdAt?: string;
  };
  token: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const payload = await response.json() as ApiResponse<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'Request failed');
  }
  return payload;
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('markai_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<AuthResult>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (fullName: string, email: string, password: string, role: 'marketing' | 'creative' = 'marketing') =>
      request<AuthResult>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ full_name: fullName, email, password, role }),
      }),
    forgotPassword: (email: string) =>
      request<{ resetInitiated: boolean }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  },
  brands: {
    getAll: async () => (await fetch(`${API_BASE}/brands`, { headers: getAuthHeader() })).json(),
  },
  campaigns: {
    getAll: async () => (await fetch(`${API_BASE}/campaigns`, { headers: getAuthHeader() })).json(),
  },
  tasks: {
    getAll: async () => (await fetch(`${API_BASE}/tasks`, { headers: getAuthHeader() })).json(),
    submit: async (id: string, payload: any) => {
      return (await fetch(`${API_BASE}/tasks/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(payload)
      })).json();
    }
  }
};