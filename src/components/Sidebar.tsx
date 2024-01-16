import { useLocation } from "react-router-dom";
import SheetComponent from "./SheetComponent";

const Sidebar = () => {
    const { pathname } = useLocation()
    
    const allowedPath = ["/dashboard", "/explore"]
    
    const content = allowedPath.includes(pathname) ? <SheetComponent /> : <></>

    return (
        content
    );
}
 
export default Sidebar;