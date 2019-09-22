export const authHeader = () => {
  // return authorization header with jwt token
  const item = localStorage.getItem("user");
  const user = item ? JSON.parse(item) : null;

  if (user && user.token) {
    return "Bearer " + user.token;
  } else {
    return null;
  }
};
