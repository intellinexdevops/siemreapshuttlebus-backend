import { Authenticated, Unauthenticated } from "convex/react"
import { Navigate, Outlet } from "react-router"


const RootLayout = () => {
    return (<>
        <Unauthenticated>
            <Outlet />
        </Unauthenticated>
        <Authenticated>
            <Navigate to="/dashboard" />
        </Authenticated>
    </>
    )
}

export default RootLayout