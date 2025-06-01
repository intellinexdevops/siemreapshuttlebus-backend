import { Authenticated, Unauthenticated } from "convex/react"
import { Navigate, Outlet } from "react-router"

const AppLayout = () => {
    return (
        <>
            <Authenticated>

                <div>
                    <div className="">
                        sidebar
                    </div>
                    <Outlet />
                </div>
            </Authenticated>
            <Unauthenticated>
                <Navigate to="/login" />
            </Unauthenticated>
        </>
    )
}

export default AppLayout