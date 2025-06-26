import { useMutation } from '@tanstack/react-query';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Registration failed');
      return data;
    },
  });
};
