const baseURL = import.meta.env.BASE_URL;

const refreshAuth = async () => {
  const response = await fetch(`${baseURL}/auth/refresh`, {
    method: "GET",
    credentials: "include"
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Refreshed token");
    return data;
  } else {
    console.log("Failed to refresh token, please log in again");
  }
}

const checkAuth = async () => {
  const response = await fetch(`${baseURL}/api/auth/status`, {
    method: "GET",
    credentials: "include"
  });

  if (response.ok) {
    const data = await response.json();
    console.log("Authenticated: ", data);
    return data;
  } else {
    console.log("Authentication token is expired, refreshing..");
    await refreshAuth();
  }
}

export default { checkAuth, refreshAuth };
