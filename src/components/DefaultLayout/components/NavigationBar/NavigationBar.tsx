import "./Navigation.css"
import { MenuIcon } from "lucide-react";
import UserAvatar from "../../../UserAvatar";
import { useOpenSidebar } from "../../../../lib/hooks/sidebar-hook";
import { useNavigate } from "react-router-dom";



const NavigationBar = () => {

    const {openSidebar, setOpenSidebar} = useOpenSidebar()
    const navigate = useNavigate()

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar)
    }

    return ( 
    <div className="navigation-bar">
        <div className="navigation-items">
            <div className="navigation-items-list">
                <div onClick={handleSidebar} className="menu-icon"><MenuIcon/></div>
                <div className="dashboard"><a className="dashboard-link" onClick={() => navigate("/home")}>Dashboard</a></div>
            </div>
            <div>
                <UserAvatar width={40} height={40} />
            </div>
        </div>
    </div>
     );
}
 
export default NavigationBar;