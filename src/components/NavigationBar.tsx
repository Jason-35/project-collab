import "../styles/Navigation.css"
import { auth } from "../firebase/firebase";
import { MenuIcon } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { useOpenSidebar } from "../lib/hooks/sidebar-hook";



const NavigationBar = () => {

    const {openSidebar, setOpenSidebar} = useOpenSidebar()


    let username = ""

    if(auth.currentUser?.displayName && username === ""){
        username = auth.currentUser.displayName
    }

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    return ( 
    <div className="navigation-bar">
        <div className="navigation-items">
            <div className="navigation-items-list">
                <div onClick={handleSidebar} className="menu-icon"><MenuIcon/></div>
                <div className="dashboard"><a className="dashboard-link" href="http://localhost:3000/home">Dashboard</a></div>
            </div>
            <div>
                <UserAvatar />
            </div>
        </div>
    </div>
     );
}
 
export default NavigationBar;