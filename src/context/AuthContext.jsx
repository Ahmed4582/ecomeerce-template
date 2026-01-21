import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getUserDetailsApi } from "../api/usersApi";

const AuthContext = createContext(null);

const normalizeUserFromLogin = (data) => {
  const rawUser = data?.user ?? data?.User ?? null;

  const user_Id =
    rawUser?.user_Id ?? rawUser?.userId ?? data?.user_Id ?? data?.userId ?? null;
  const email = rawUser?.email ?? data?.email ?? null;
  const role =
    rawUser?.role ??
    rawUser?.role_Name ??
    data?.role ??
    data?.role_Name ??
    null;

  const user_Name =
    rawUser?.user_Name ??
    rawUser?.userName ??
    data?.user_Name ??
    data?.userName ??
    null;

  const address =
    rawUser?.address ??
    rawUser?.shipping_Address ??
    data?.address ??
    data?.shipping_Address ??
    null;

  const phone =
    rawUser?.phone ??
    rawUser?.mobile ??
    data?.phone ??
    data?.mobile ??
    null;

  return {
    user_Id,
    email,
    role,
    user_Name,
    address,
    phone,
  };
};

const normalizeUserDetails = (details) => {
  // backend may return different casing/fields
  const raw = details?.user ?? details?.User ?? details ?? {};
  return {
    user_Id: raw.user_Id ?? raw.userId ?? raw.id ?? null,
    email: raw.email ?? null,
    user_Name: raw.user_Name ?? raw.userName ?? raw.name ?? null,
    address: raw.address ?? raw.shipping_Address ?? null,
    phone:
      raw.phone ??
      raw.mobile ??
      raw.phoneNumber ??
      raw.phone_Number ??
      raw.phone_number ??
      null,
    role: raw.role ?? raw.role_Name ?? null,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const mergeAndPersistUser = useCallback((extra) => {
    setUser((prev) => {
      const merged = {
        ...(prev || {}),
        ...Object.fromEntries(
          Object.entries(extra || {}).filter(([, v]) => v !== null && v !== "")
        ),
      };

      try {
        const raw = localStorage.getItem("auth");
        const parsed = raw ? JSON.parse(raw) : null;
        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...(parsed || {}),
            user: merged,
          })
        );
      } catch {
        // ignore
      }

      return merged;
    });
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const details = await getUserDetailsApi();
      const extra = normalizeUserDetails(details);
      mergeAndPersistUser(extra);
      return extra;
    } catch {
      return null;
    }
  }, [mergeAndPersistUser]);

  // Load user from localStorage + refresh from API (real data)
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed.user);
    }

    // If a token exists, refresh user data from the API
    if (localStorage.getItem("token")) {
      refreshUser();
    }
    setLoading(false);
  }, [refreshUser]);

  const login = (data) => {
    const token = data?.token;
    const refreshToken = data?.refresh_Token ?? data?.refreshToken;

    const baseUser = normalizeUserFromLogin(data);

    const authData = {
      user: baseUser,
      token,
      refreshToken,
    };

    // AxiosClient reads these keys
    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

    // AuthContext reads this key
    localStorage.setItem("auth", JSON.stringify(authData));

    setUser(authData.user);

    // After storing the token, fetch full user details (address, phone, etc.)
    // If it fails, we still keep the basic login data.
    getUserDetailsApi()
      .then((details) => {
        const extra = normalizeUserDetails(details);
        mergeAndPersistUser(extra);
      })
      .catch(() => {});
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!localStorage.getItem("token"),
        loading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
