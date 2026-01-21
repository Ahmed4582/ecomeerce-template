import api from "./axiosClient";

// ================= USERS =================

export const getUsersApi = (params) => {
  return api.get("/Users/GetUsers", { params });
};

export const getUserDetailsApi = () => {
  return api.get("/Users/UserDetails");
};

export const getUserDetailsForAdminApi = (userId) => {
  return api.get("/Users/UserDetailsForAdmin", { params: { userId } });
};

