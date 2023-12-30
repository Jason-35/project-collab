import { useOpenSidebar } from "../../../../lib/hooks/sidebar-hook";
import "./Sidebar.css"
import CatLogo from '../../../../assets/kitty.png'
import { Bell, Home, Search, UserPlus, Users, X } from "lucide-react";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CreateProjectModal from "../../../CreateProjectModal";
import { useEffect, useState } from "react";
import { getCurrentUserDocument } from "../../../../lib/service/UserService";
import DefaultModal from "../Modal/DefaultModal";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import TagMenu from "../TagMenu/TagMenu";

interface projObject {
    projectName: string,
    projectUrl: string,
}

interface FormData {
    projectName: string;
    level: string;
    tags: string[];
    description: string;
    url: string;
    max: number
}


const SideBar = () => {
    const { openSidebar, setOpenSidebar } = useOpenSidebar()
    const [open, setOpen] = useState(false)
    const [listProj, setListProj] = useState<projObject[]>([])
    const [experience, setExperience] = useState("beginner")
    const [tags, setTags] = useState<Array<string>>([])
    const [size, setSize] = useState(1)

    const [formData, setFormData] = useState<FormData>({
        projectName: '',
        level: 'beginner',
        tags: [],
        description: '',
        url: '',
        max: 1
      });

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

    const handleCreateProject = () => {
        setOpenSidebar(false)
        setOpen(false)
        setFormData({...formData, ["tags"]: tags, ["max"]: size, ["level"]: experience})
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const value = Number(e.target.value)
        if (value && value >= 1){
            setSize(value)
        }
    }

    const button = (
    <div className="create-project">
        <button onClick={handleCreateProject}>Create</button>
    </div>
    )

    const content = (

        <form className="content-container">
            <div className="form-center">
                <label>Project Name: </label>
                <input type="text" onChange={(e) => setFormData({...formData, ["projectName"]: e.target.value})} />
            </div>
            <div className="form-center">
                <label>Level:</label>
                <DropdownMenu selected={experience} setSelected={setExperience} items={["beginner","intermediate","expert"]}/>
            </div>
            <div className="form-center">
                <label>Descriptions:</label>
                <textarea name="" id="" cols={40} rows={5} onChange={(e) => setFormData({...formData, ["description"]: e.target.value})}></textarea>
            </div>
            <div className="form-center">
                <label>Size:</label>
                <input type="number" value={size} onChange={handleInputChange}/>
            </div>
            <div className="form-center">
                <label>Tags:</label>
                <TagMenu items={["java", "python"]} tags={tags} setTags={setTags} />
            </div>
        </form>
    )

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
                        {/* <CreateProjectModal open={open} setOpen={setOpen}/> */}
                        <DefaultModal open={open} setOpen={setOpen} title="Create a Project Group" buttons={button} content={content}/>
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