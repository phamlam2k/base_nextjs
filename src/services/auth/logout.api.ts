import { useMutation, useQueryClient } from '@tanstack/react-query';

const logout = async () => {
  const res = await fetch('/api/logout', { method: 'POST' });
  if (!res.ok) throw new Error('Logout failed');
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
