export const authHeader = () => {
  // return authorization header with jwt token
  const item = localStorage.getItem("user");
  const user = item ? JSON.parse(item) : null;

  if (user && user.id_token) {
    return "Bearer " + user.id_token;
  } else {
    return "";
  }
};
