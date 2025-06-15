import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircleIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { useAuth } from "@/middleware/AuthMiddleware"

const Root = () => {

    const navigate = useNavigate();

    const { session } = useAuth()

    const handleNavigate = () => {
        navigate(session ? '/dashboard' : '/login');
    }

    return (
        <div className="flex flex-col gap-y-6 items-center justify-center h-screen">
            <Label className="text-2xl">Thank you for using our services!</Label>
            <Button onClick={handleNavigate}>Continue to Dashboard</Button>
            <div>
                <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to process your dashboard.</AlertTitle>
                    <AlertDescription>
                        <p>Please verify to owner and try again.</p>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    )
}

export default Root