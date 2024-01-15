import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { handleAuthentication, handleOAuthSignIn, registerSchema } from "@/lib/helper/authentication"

import GLogo from "../../../public/g.png"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { AuthType, OAuthType } from "@/constants/constants"
import { useShowPassword } from "@/hooks/useShowPassword"
import { Link, useNavigate } from "react-router-dom"


const Register = () => {

    const navigate = useNavigate()

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            type: AuthType.Register
        }
    })
    const { showPassword, handleShowPassword} = useShowPassword()

    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[450px] border-transparent lg:border-white md:border-white">
                <CardHeader className="mb-2">
                    <CardTitle>Welcome to Project Collab!</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAuthentication)} className="grid gap-4">
                            <FormField name="email" render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white" />
                                </FormItem>
                            )} />

                            <FormField name="password" render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={showPassword ? "" : "password"} placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-white" />
                                </FormItem>
                            )} />
                            <div className="justify-self-end hover:cursor-pointer" onClick={handleShowPassword}>
                                {showPassword ? <Eye /> : <EyeOff />}
                            </div>
                            <Button type="submit">Register</Button>
                            <Link to={"/login"} className="hover:underline">Already have an account?</Link>
                        </form>
                    </Form>
                    <Separator className="my-4 " />
                    <div className="grid gap-4">
                        <Label>Register with</Label>
                        <Button onClick={() => handleOAuthSignIn(OAuthType.Google, navigate)} className="flex gap-2"><img src={GLogo} className=""/> Google</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default Register;