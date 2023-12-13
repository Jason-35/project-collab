import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import "../../styles/Explore.css"
import RequestToJoinModal from "../RequestToJoinModal";

const Explore = () => {
    const [projects, setProjects] = useState<DocumentData>([])
    const [openModal, setOpenModal] = useState(false)
    const [selectedProj, setSelectedProj] = useState<DocumentData | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            const querySnapshot = query(collection(db, "group"))
            await getDocs(querySnapshot).then((data) => {
                setProjects(data.docs.map(doc => doc.data()))
            })
        }

        fetchData()
    }, [])

    const handleRequestToJoin = ( proj: DocumentData) => {
        console.log("I WANT TO JOIN!")
        console.log(proj.group.projectName)
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
                {proj.group.projectName} 
                <br /> owner: {proj.owner}
                <br /> 0 / {proj.group.max}
                <br /> {proj.group.level}
                <br /> 
                </div>
                <div>
                    {proj.group.tags.map((skill:string, index:number) => (
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