import { Activity, CircleUserRound, Home } from "lucide-react";
import "../styles/BottomBar.css"
import { useState } from "react";

const BottomBar = () => {
    const [active, setActive] = useState("home")

    
    const handleBottomBarActive = (activeId: string) => {
        setActive(activeId)
    }

    const getIconStrokeWidth = (id: string) => {
        return active === id ? 3 : 2
    }
    
    
    return ( 
    <div className="bottom-bar-container">
        <span onClick={() => handleBottomBarActive("home")} ><Home size={32} strokeWidth={getIconStrokeWidth("home")} /></span>
        <span onClick={() => handleBottomBarActive("activity")} ><Activity size={32} strokeWidth={getIconStrokeWidth("activity")}/></span>
        <span onClick={() => handleBottomBarActive("friends")} ><CircleUserRound size={32} strokeWidth={getIconStrokeWidth("friends")}/></span>
    </div>
    
     );
}
 
export default BottomBar;