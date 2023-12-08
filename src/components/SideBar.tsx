import { useOpenSidebar } from "../lib/hooks/sidebar-hook";
import "../styles/Sidebar.css"
import CatLogo from '../assets/kitty.png'
import { Bell, Bug, Home, MoreVertical, Search, UserPlus, Users, X } from "lucide-react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "./CreateProjectModal";
import { useState } from "react";

const SideBar = () => {
    const { openSidebar, setOpenSidebar } = useOpenSidebar()
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const handleCloseSidebar = (event: React.MouseEvent) => {
        const clickedElement = event.target as HTMLElement
        const elementClass = clickedElement.classList.value
        if(elementClass === "transparent-sheet"){
            setOpenSidebar(false)
            setOpen(false)
        }
    } 

    let showSidebar = <></>
    if(openSidebar){
        showSidebar = (
            <div onClick={handleCloseSidebar} className="transparent-sheet">
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <span className="sidebar-logo"><img src={CatLogo} width={"32px"} height={"32px"}/></span>
                        <X className="x-button" onClick={() => setOpenSidebar(false)} />
                    </div>
                    
                    <ul className="sidebar-list">
                        <li onClick={() => {navigate("/home")}}>
                            <span className="list-icons"><Home/></span>
                            <span>Home</span>
                        </li>
                        <li onClick={() => {navigate("/explore")}}>
                            <span className="list-icons"><Search/></span>
                            <span>Explore</span>
                        </li>
                        <li onClick={() => {navigate("/home")}}>
                            <span className="list-icons"><Bell/></span>
                            <span>Notification</span>
                        </li>
                        <li onClick={() => {navigate("/issues")}}>
                            <span className="list-icons"><Bug /></span>
                            <span>Issues</span>
                        </li>
                        <li onClick={() => {setOpen(true)}}>
                            <span className="list-icons"><UserPlus /></span>
                            <span>Create Project Group</span>
                        </li>
                    </ul>
                        <CreateProjectModal open={open} setOpen={setOpen}/>

                        <div className="sidebar-divider-container">
                            <Divider className="sidebar-divider"/>
                        </div>

                    <ul>
                        <li className="group-project-section">
                            <span><Users /></span>
                            <span>Project Group</span>
                        </li>
                        <li>
                            <span>Project 1</span>
                            <span><MoreVertical /></span>
                        </li>
                        <li>
                            <span>Project 2</span>
                            <span><MoreVertical /></span>
                        </li>
                        <li>
                            <span>Project 3</span>
                            <span><MoreVertical />  </span>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }

    return ( 
        showSidebar
     );
}
 
export default SideBar;