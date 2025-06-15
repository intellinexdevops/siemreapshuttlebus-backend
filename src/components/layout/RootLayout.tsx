import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"

const RootLayout = () => {
    return <>
        <Outlet />
        <Toaster richColors />
    </>
}

export default RootLayout