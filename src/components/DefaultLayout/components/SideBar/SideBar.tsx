import { useOpenSidebar } from "../../../../lib/hooks/sidebar-hook";
import "./Sidebar.css"
import CatLogo from '../../../../assets/kitty.png'
import { Bell, Home, Search, UserPlus, Users, X } from "lucide-react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateProjectModal from "../../../CreateProjectModal";
import { useEffect, useState } from "react";
import { getCurrentUserDocument } from "../../../../lib/service/UserService";

interface projObject {
    projectName: string,
    projectUrl: string,
}

const SideBar = () => {
    const { openSidebar, setOpenSidebar } = useOpenSidebar()
    const [open, setOpen] = useState(false)
    const [listProj, setListProj] = useState<projObject[]>([])

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchProjects = async() =>{
            const currentUser = await getCurrentUserDocument()
            if(currentUser && currentUser.memberOfProject.length > 0){
                setListProj(currentUser.memberOfProject)
            }
        }
        fetchProjects()
    }, [])

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
                        <li onClick={() => {
                            setOpenSidebar(false)
                            navigate("/home")
                            }}>
                            <span className="list-icons"><Home/></span>
                            <span>Home</span>
                        </li>
                        <li onClick={() => {
                            setOpenSidebar(false)
                            navigate("/explore")
                            }}>
                            <span className="list-icons"><Search/></span>
                            <span>Explore</span>
                        </li>
                        <li onClick={() => {
                            setOpenSidebar(false)
                            navigate("/notifications")
                            }}>
                            <span className="list-icons"><Bell/></span>
                            <span>Notification</span>
                        </li>
                        <li onClick={() => {
                            setOpen(true)
                            }}>
                            <span className="list-icons"><UserPlus /></span>
                            <span>Create Project Group</span>
                        </li>
                    </ul>
                        <CreateProjectModal open={open} setOpen={setOpen}/>

                        <div className="sidebar-divider-container">
                            <Divider className="sidebar-divider"/>
                        </div>

                    <div className="group-project-header">
                        <span><Users /></span>
                        <span>Project Group</span>
                    </div>

                    <ul className="group-section">
                        {listProj && (listProj.length > 0) && listProj.map((proj) => (
                            <li>
                                <span onClick={() => {
                                    navigate(proj.projectUrl)
                                    setOpenSidebar(false)
                                }}>
                                    {proj.projectName}
                                </span>
                            </li>
                        )) }
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