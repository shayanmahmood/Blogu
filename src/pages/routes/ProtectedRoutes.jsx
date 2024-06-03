import Spinner from "../../components/Spinner"
import { useAuthRoute } from "../../features/authentication/useAuthRoute"
import { Navigate } from "react-router-dom"
import AppLayout from "../../pages/AppLayout"

function ProtectedRoutes() {
    const { isLogin, isLoading } = useAuthRoute()

    if (isLoading) return <Spinner />
    if (!isLoading && isLogin) return <AppLayout />
    else return <Navigate to='/login' />
}

export default ProtectedRoutes
