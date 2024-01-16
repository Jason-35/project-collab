import { Label } from "@radix-ui/react-label";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Switch } from "./ui/switch";
import { useTheme } from "./theme/theme-hook";
import { useState } from "react";
import { handleLogout } from "@/lib/helper/authentication";
import { useOpen } from "@/hooks/useOpen";
import CreateProject from "./CreateProject";

const SheetComponent = () => {
    
    const [checked, setChecked] = useState(false)
    const { open, opening, closing } = useOpen()
    const { setTheme } = useTheme()
    const navigate = useNavigate()

    const handleChangeTheme = () => {
        setChecked(!checked)
        if(checked){
            setTheme("dark")
        }else{
            setTheme("light")
        }
    }
    
    return ( 
        <div>
            <CreateProject open={open} closing={closing}/>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline"><Menu/></Button>
                </SheetTrigger>
                <SheetContent className="w-[300px]" side={"left"}>
                    <SheetHeader className="pl-4 flex items-center gap-2">
                        <SheetTitle>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </SheetTitle>
                        <SheetTitle className="truncate">John Mayday</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <SheetClose asChild>
                            <Link to={"/dashboard"} className="hover:bg-orange-500 h-8 grid items-center pl-4 rounded-md">
                                <Label className="hover:cursor-pointer">Dashboard</Label>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link to={"/dashboard"} className="hover:bg-orange-500 h-8 grid items-center pl-4 rounded-md">
                                <Label className="hover:cursor-pointer">Profile</Label>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link to={"/explore"} className="hover:bg-orange-500 h-8 grid items-center pl-4 rounded-md">
                                <Label className="hover:cursor-pointer">Explore</Label>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link to={"/dashboard"} className="hover:bg-orange-500 h-8 grid items-center pl-4 rounded-md">
                                <Label className="hover:cursor-pointer">Notification</Label>
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <div onClick={opening} className="hover:bg-orange-500 h-8 grid items-center pl-4 rounded-md">
                                <Label className="hover:cursor-pointer">Create Project</Label>
                            </div>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link to={"/dashboard"} className="hover:bg-orange-500 h-8 grid items-center pl-4 rounded-md">
                                <Label className="hover:cursor-pointer">Friends</Label>
                            </Link>
                        </SheetClose>
                        <Separator />
                        <div className="h-5/6 grid gap-4">
                            <Label className="ml-4">Projects</Label>
                            <ScrollArea className="max-h-96">
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                                <Link to={"/"}><h3 className="hover:bg-orange-500 h-8 leading-8 pl-4">project</h3></Link>
                            </ScrollArea>
                        </div>
        
                        <div className="flex items-center justify-between gap-4">
                            <Button onClick={() => handleLogout(navigate)}>Logout</Button>
                            <div className="flex gap-4">
                                <Switch className="col-start-2 bg-white" checked={checked} onCheckedChange={handleChangeTheme} />
                                {checked ? <Label><Moon/></Label> : <Label><Sun/></Label> }
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
     );
}
 
export default SheetComponent;