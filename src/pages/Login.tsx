import { LoginForm } from "@/components/material/LoginForm"
import { Navigate } from "react-router";
import { useAuth } from "@/middleware/AuthMiddleware";
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'
// import supabase from "@/utils/supabase";

const Login = () => {

    const { session } = useAuth()

    if (session) return <Navigate to={'/dashboard'} />

    return <div className="h-screen flex items-center justify-center">
        <LoginForm />
    </div>

    // return <div className="h-screen mx-auto w-96 mt-32">
    //     <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    // </div>
}

export default Login