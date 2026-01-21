import { useQuery } from "@tanstack/react-query";
import {
  getUserDetailsApi,
  getUserDetailsForAdminApi,
  getUsersApi,
} from "../api/usersApi";

export const useUsers = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersApi(params),
    keepPreviousData: true,
  });
};

export const useUserDetailsForAdmin = (userId) => {
  return useQuery({
    queryKey: ["userDetailsForAdmin", userId],
    queryFn: () => getUserDetailsForAdminApi(userId),
    enabled: !!userId,
  });
};

export const useUserDetails = (enabled = true) => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetailsApi(),
    enabled,
  });
};

