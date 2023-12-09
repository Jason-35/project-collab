import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import NavigationBar from "../NavigationBar";
import SideBar from "../SideBar";

const Explore = () => {
    const [projects, setProjects] = useState([""])

    useEffect(() => {
        const fetchData = async() => {
            const querySnapshot = query(collection(db, "group"))
            await getDocs(querySnapshot).then((data) => {
                setProjects(data.docs.map(doc => doc.data().group.projectName))
            })
        }

        fetchData()
    }, [])

    return (
    <div>
        <NavigationBar />
        <SideBar />
        {projects.map((proj) => (
            <div>{proj}</div>
        ))}
    </div> 
    );
}
 
export default Explore;<div></div>