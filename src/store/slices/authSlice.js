import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/login";
import { REGISTER_USER } from "../userActions";
REGISTER_USER;

const emptyState = {
  id: "",
  token: "",
  fullName: "",
  email: "",
  username: "",
  experience: "",
  contact: "",
  speciality: "",
  city: "",
  roles: "",
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("sessionData")) ?? emptyState,
  reducers: {
    updateUserData(state, action) {
      const newUserData = action.payload;

      state.id = newUserData.id;
      state.fullName = newUserData.fullName;
      state.email = newUserData.email;
      state.username = newUserData.username;
      state.experience = newUserData.experience;
      state.contact = newUserData.contact;
      state.speciality = newUserData.speciality;
      state.city = newUserData.city;
      state.roles = newUserData.roles;

      localStorage.setItem("sessionData", JSON.stringify({ ...state }));
    },
    updateToken(state, action) {
      const newToken = action.payload;

      state.token = newToken;
      localStorage.setItem("sessionData", JSON.stringify({ ...state }));
    },

    startSession(state) {
      state.isLogged = true;
      localStorage.setItem("sessionData", JSON.stringify({ ...state }));
    },

    reset() {
      localStorage.removeItem("sessionData");
      return emptyState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REGISTER_USER, (state, action) => {
      const newUserData = action.payload;
      state.id = newUserData.id;
      state.fullName = newUserData.fullName;
      state.email = newUserData.email;
      state.username = newUserData.username;
      state.experience = newUserData.experience;
      state.contact = newUserData.contact;
      state.specialty = newUserData.specialty;
      state.city = newUserData.city;
      localStorage.setItem("sessionData", JSON.stringify({ ...state }));
    });
  },
});

export const { updateUserData, reset, startSession, updateToken } =
  authSlice.actions;

  export const startSessionThunk =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const sessionData = await login({ email, password });
      console.log("Datos de la sesión:", sessionData);

      // Determinar si es Explorer o Entrepreneur
      const userKey = sessionData.Explorer ? "Explorer" : "Entrepreneur";
      const userData = sessionData[userKey];

      if (!userData) {
        throw new Error("No se encontraron datos de usuario en la respuesta.");
      }

      // Extraer la información del usuario desde la respuesta
      const parsedUserData = {
        id: userData.id,
        fullName: userData.fullName,
        email: userData.email,
        username: userData.username,
        experience: userData.experience || "", // Maneja caso de experiencia nula o indefinida
        contact: userData.contact,
        speciality: userData.specialty || "", // Maneja caso de especialidad nula o indefinida
        city: userData.city || "", // Maneja caso de ciudad nula o indefinida
        roles: userData.roles || "", // Agregado para la propiedad 'roles'
      };

      dispatch(updateUserData(parsedUserData));
      dispatch(updateToken(sessionData.token));
      dispatch(startSession());
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  };


export default authSlice.reducer;
