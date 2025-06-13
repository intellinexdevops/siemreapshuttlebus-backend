import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [step, setStep] = useState<"signUp" | "signIn">("signIn");
    const signIn = (input: FormData) => {
        console.log(input)
    }
    return (
        <div className={cn("flex flex-col gap-6 w-full max-w-96", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        void signIn(formData);
                    }}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    name="email"
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {/* <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a> */}
                                </div>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Input name="flow" type="hidden" value={step} />
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    {step === "signIn" ? "Sign in" : "Sign up"}
                                </Button>
                                <Button variant="outline" className="w-full" type="button"
                                    onClick={() => {
                                        setStep(step === "signIn" ? "signUp" : "signIn");
                                    }}
                                >
                                    {step === "signIn" ? "Sign up instead" : "Sign in instead"}
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="#" className="underline underline-offset-4">
                                Contact Admin
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
