"use client";

import axiosServices from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "./auth.type";
import ApiUrl from "@/lib/endpointApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const authApi = {
  login: async (payload: LoginPayload) => {
    const response = await axiosServices.post(ApiUrl.auth.login, payload);

    return response;
  },
  register: async (payload: Omit<RegisterPayload, "confirmPassword">) => {
    const response = await axiosServices.post(ApiUrl.auth.register, payload);

    return response;
  },
  logout: async () => {
    const response = await axiosServices.post(ApiUrl.auth.logout);

    return response;
  },
};

export const useLoginMutate = () => {
  return useMutation({
    mutationFn: authApi.login,
  });
};

export const useRegisterMutate = () => {
  return useMutation({
    mutationFn: authApi.register,
  });
};

export const useLogoutMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
