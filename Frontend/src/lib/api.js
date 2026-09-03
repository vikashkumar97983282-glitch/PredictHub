const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://predicthub-g9lj.onrender.com"
).replace(/\/+$/, "");

export const getStoredToken = () => {
  const token =
    localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

  return token && isValidToken(token) ? token : null;
};

export const getStoredUser = () => {
  if (!getStoredToken()) {
    return null;
  }

  try {
    return JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user")
    ) || null;
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
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
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

  otherStorage.removeItem("access_token");
  storage.setItem("access_token", data.token);
  storage.setItem("user", JSON.stringify(data.user || {}));

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
