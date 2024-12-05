import { axiosInstance } from "../../api/axiosInstance"

export const login = async ({email, password}) => {
    try {
        // credentials, es el objeto que espera el backend para poder hacer la validacion del usuario
        const credentials = {email, password}
        const res = await axiosInstance.post('auth/login', credentials)

        console.log('Respuesta de inicio de sesión:', res.data)
        return res.data

    } catch (error) {
        console.error(error)
    }
}

