export const authHeader = () => {
  // return authorization header with jwt token
  const token = localStorage.getItem("jwtToken");

  if (token) {
    return "Bearer " + token;
  } else {
    return "";
  }
};
