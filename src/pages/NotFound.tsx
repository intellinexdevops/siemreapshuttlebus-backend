import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col gap-y-4 h-screen items-center justify-center">
            <p className="text-6xl font-bold">404</p>
            <p className="text-neutral-500">This page can't be found!</p>
            <Button className="font-normal" onClick={() => navigate(-1)}>
                Return Home
            </Button>
        </div>
    )
}

export default NotFound