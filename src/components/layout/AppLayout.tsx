import { Outlet } from "react-router"

const AppLayout = () => {
    return (
        <div>
            <div className="">
                sidebar
            </div>
            <Outlet />
        </div>
    )
}

export default AppLayout