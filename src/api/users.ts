import { authHeader } from "../helpers/auth-header";

const baseUrl = "http://193.124.114.46:3001";

export const login = async (email: string, password: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  const response = await fetch(`${baseUrl}/sessions/create`, requestOptions);

  const user = await handleResponse(response);
  // login successful if there's a jwt token in the response
  if (user.id_token) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("user", JSON.stringify(user));
  }
  return user;
};

export const register = async (user: any) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  const response = await fetch(`${baseUrl}/users`, requestOptions);
  return handleResponse(response);
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
};

export const getUserInfo = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: authHeader()
    }
  };

  const response = await fetch(
    `${baseUrl}/api/protected/user-info`,
    requestOptions
  );
  const resp = await handleResponse(response);
  return {
    id: resp.user_info_token.id,
    username: resp.user_info_token.name,
    email: resp.user_info_token.email,
    balance: resp.user_info_token.balance
  };
};

export const handleResponse = async (response: Response) => {
  const text = await response.text();
  if (!response.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
    }
    const error = text;
    return Promise.reject(error);
  }
  const data = text && JSON.parse(text);
  return data;
};
