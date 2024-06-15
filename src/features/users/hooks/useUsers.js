import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../../services/user/getUsers"

function useUsers() {

    const { isLoading, data: users } = useQuery({
        queryFn: getUsers,
        queryKey: ['users']
    })

    return { isLoading, users }

}

export default useUsers
