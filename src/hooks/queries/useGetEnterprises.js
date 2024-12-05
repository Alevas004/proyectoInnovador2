import { useQuery } from "@tanstack/react-query"
import { getEntreprises } from "../../services/enterprises/getEnterprises"



export const useGetEntreprises = () => {
    const query = useQuery({queryKey: ['entreprises'], queryFn: getEntreprises })
    return query
}