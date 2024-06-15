import { useQuery } from "@tanstack/react-query"
import { getSuggestions } from "../../../services/Suggestions/ApiSuggestions"

export function useGetSuggestions() {

    const { isLoading, data: Sugestions } = useQuery({
        queryFn: () => getSuggestions(),
        queryKey: ['suggestions']
    })

    return { isLoading, Sugestions }
}

export default useGetSuggestions
