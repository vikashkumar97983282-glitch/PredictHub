const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://predicthub-g9lj.onrender.com"
).replace(/\/+$/, "");

export const getStoredToken = () => {
  const localToken = localStorage.getItem("access_token");
  const sessionToken = sessionStorage.getItem("access_token");

  if (localToken && isValidToken(localToken)) {
    return localToken;
  }

  if (sessionToken && isValidToken(sessionToken)) {
    return sessionToken;
  }

  localStorage.removeItem("access_token");
  sessionStorage.removeItem("access_token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
  return null;
};

export const getStoredUser = () => {
  const localToken = localStorage.getItem("access_token");
  const sessionToken = sessionStorage.getItem("access_token");

  if (!localToken && !sessionToken) {
    return null;
  }

  try {
    const storage = localToken && isValidToken(localToken)
      ? localStorage
      : sessionStorage;
    return JSON.parse(storage.getItem("user")) || null;
  } catch {
    return null;
  }
};

const isValidToken = (token) => {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  try {
    const encodedPayload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const paddedPayload = encodedPayload.padEnd(
      encodedPayload.length + ((4 - (encodedPayload.length % 4)) % 4),
      "="
    );
    const payload = JSON.parse(
      atob(paddedPayload)
    );

    return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const storeAuth = (data, rememberMe = true) => {
  if (
    !data?.token ||
    typeof data.token !== "string" ||
    !isValidToken(data.token)
  ) {
    throw new Error("The server did not return a valid authentication token.");
  }

  const storage = rememberMe ? localStorage : sessionStorage;
  const otherStorage = rememberMe ? sessionStorage : localStorage;
  const user = {
    ...(data.user || {}),
    role: data.user?.role?.toLowerCase() || "user",
  };

  otherStorage.removeItem("access_token");
  storage.setItem("access_token", data.token);
  storage.setItem("user", JSON.stringify(user));

  window.dispatchEvent(new Event("user-authenticated"));
};

export const clearAuth = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("admin");
  sessionStorage.removeItem("access_token");
  sessionStorage.removeItem("user");
  window.dispatchEvent(new Event("user-authenticated"));
};

export const logout = async () => {
  const token = getStoredToken();

  try {
    if (token) {
      await requestJson("/logout/", { method: "POST" });
    }
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    clearAuth();
  }
};

export const getStoredModels = () => {
  try {
    const models = JSON.parse(localStorage.getItem("predicthub_models"));
    return Array.isArray(models) ? models : [];
  } catch {
    return [];
  }
};

export const saveModel = (model) => {
  const models = [...getStoredModels(), model];
  localStorage.setItem("predicthub_models", JSON.stringify(models));
  window.dispatchEvent(new Event("model-added"));
};

export const requestJson = async (path, options = {}) => {
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  const token = getStoredToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { message: await response.text() };

  if (!response.ok) {
    throw new Error(
      data?.detail || data?.message || `Request failed (${response.status}).`
    );
  }

  return data;
};

export { API_BASE_URL };
