import { DocumentData, collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";
import "../../styles/Explore.css"
import { useNavigate } from "react-router-dom";

const Explore = () => {
    const [projects, setProjects] = useState<DocumentData>([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async() => {
            const querySnapshot = query(collection(db, "group"))
            await getDocs(querySnapshot).then((data) => {
                setProjects(data.docs.map(doc => doc.data()))
            })
        }

        fetchData()
    }, [])

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
            <div className="searchCard" onClick={() => {navigate(proj.url)}} key={index}>
                {proj.group.projectName} 
                <br /> owner: {proj.owner}
                <br /> 0 / {proj.group.max}
            </div>
        ))}

    </div> 
    );
}
 
export default Explore;<div></div>