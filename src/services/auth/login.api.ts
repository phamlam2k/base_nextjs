import { useMutation } from '@tanstack/react-query';

interface LoginPayload {
  email: string;
  password: string;
}

const login = async (payload: LoginPayload) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.error || 'Login failed');
  }

  return await res.json();
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
