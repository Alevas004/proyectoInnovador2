
export const REGISTER_USER = "REGISTER_USER";

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});
