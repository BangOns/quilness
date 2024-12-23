export const localStorageUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};
export const localStorageSetUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};
export const localStorageRemoveUser = () => localStorage.removeItem("user");
