import { axiosInstance } from "../../api/axiosInstance";



export const getEntreprises = async () => {
    try {
        const res = await axiosInstance.get("entrepreneurShip");
        return res.data; // Asegúrate de devolver los datos si la solicitud es exitosa
    } catch (error) {
        console.error("Error al obtener las empresas:", error.response?.data || error.message);
        throw new Error("No se pudieron obtener las empresas"); // Lanza un error explícito para que react-query lo maneje
    }
};
