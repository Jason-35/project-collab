import { useLocation } from "react-router-dom";
import SheetComponent from "./SheetComponent";
import { useLoggedIn } from "@/provider/Logged/loggedin-hook";

const Sidebar = () => {
    const { pathname } = useLocation()

    const {loggedIn} = useLoggedIn()

    const allowedPath = ["/dashboard", "/explore"]

    const content = allowedPath.includes(pathname) ? <div className="pl-2 pt-2 mb-2"><SheetComponent /></div> : <></>

    return (
        <>{loggedIn ? content : <></>}</>
    );
}
 
export default Sidebar;