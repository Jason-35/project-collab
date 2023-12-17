import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import "../../styles/Explore.css"
import RequestToJoinModal from "../RequestToJoinModal";
import { useNavigate } from "react-router-dom";
import { getAllProjectGroups } from "../../lib/service/ProjectGroupService";

const Explore = () => {
    const [projects, setProjects] = useState<DocumentData>([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedProj, setSelectedProj] = useState<DocumentData | null>(null)

    const navigate = useNavigate()

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    useEffect(() => {
        const fetchData = async() => {
            // const querySnapshot = query(collection(db, "projectGroup"))
            // await getDocs(querySnapshot).then((data) => {
            //     setProjects(data.docs.map(doc => doc.data()))
            // })
            const projectData = await getAllProjectGroups()
            if(projectData) setProjects(projectData)
        }

        fetchData()
    }, [])

    const handleRequestToJoin = ( proj: DocumentData) => {
        setSelectedProj(proj)
        setOpenModal(true)
    }

    return (
    <div className="container-with-nav">
        <NavigationBar />
        <SideBar />
        <div className="search-and-filter">
            <input type="text" />
            <button>Search</button>
            <br />
            <button>level</button>
            <button>skills</button>
        </div>

        {projects.map((proj: DocumentData, index: number) => (
            <div className="searchCard" onClick={() => handleRequestToJoin(proj)} key={index}>
                <div>
                    {proj.projectData.projectName} 
                    <br /> owner: {proj.owner}
                    <br /> 0 / {proj.projectData.max}
                    <br /> {proj.projectData.level}
                    <br /> 
                </div>
                <div>
                    {proj.projectData.tags.map((skill:string, index:number) => (
                        <div key={index}>{skill}</div>
                    ))}
                </div>
            </div>
        ))}

        <RequestToJoinModal openModal={openModal} setOpenModal={setOpenModal} selectedProj={selectedProj} />

    </div> 
    );
}
 
export default Explore;<div></div>