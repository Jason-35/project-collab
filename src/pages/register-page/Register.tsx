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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff } from "lucide-react"
import { AuthType, OAuthType, Status } from "@/constants/constants"
import { useShowPassword } from "@/hooks/useShowPassword"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


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

    const [status, setStatus ] = useState(Status.OK)

    return (
        <div className="h-screen flex justify-center items-center">
            <AlertDialog open={status === Status.ERROR ? true : false}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Email already exist</AlertDialogTitle>
                        <AlertDialogDescription>
                            This email already exist. Please enter a different email.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setStatus(Status.OK)}>OK</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
  
            <Card className="w-[450px] border-transparent lg:border-white md:border-white">
                <CardHeader className="mb-2">
                    <CardTitle>Welcome to Project Collab!</CardTitle>
                    <CardDescription>Create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((e) => handleAuthentication(e, navigate, setStatus))} className="grid gap-4">
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
                    <div className="flex items-center justify-between my-4">
                        <Separator className="w-1/4"/> <p>OR CONTINUE WITH</p> <Separator className="w-1/4" />
                    </div>
                    <div className="grid gap-4">
                        <Button onClick={() => handleOAuthSignIn(OAuthType.Google, navigate)} className="flex gap-2"><img src={GLogo} className=""/> Google</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
 
export default Register;