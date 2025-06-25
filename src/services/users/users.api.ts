import { QUERY_KEYS } from "@/lib/keys";
import { useQuery } from "@tanstack/react-query";

const usersApi = {
  getUserInfo: async () => {
    try {
      const response = await fetch("/api/users/info");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      throw error;
    }
  },
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS.INFO],
    queryFn: usersApi.getUserInfo,
  });
};
