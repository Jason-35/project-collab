// import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Guideline.css"
import "../HelperComponent/common.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

const Guideline = () => {
    const {uuid} = useParams()
    const [project, setProject] = useState<DocumentData>() 

    useEffect(() => {
        const getProjData = async() => {
            const projData = await getDoc(doc(db, "projectGroup", String(uuid)))
            if(project === undefined){
                setProject(projData.data())

                console.log(projData.data())
            }
        } 
        getProjData()
    })

    

    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Guideline"/>
                <div className="guideline-text">
                    Room Name: {project && project.projectData.projectName}
                </div>
                <div className="guideline-text">
                    Repository: {project && project.projectData.repository}
                </div>
                <div className="guideline-text">
                    Description:  {project && project.projectData.description}
                </div>
                {/* <DefaultModal title={"Guideline"} open={open} setOpen={setOpen} content={formContent} buttons={editBtn}/> */}
                {/* {currentUser === project?.ownerId && <button onClick={() => {setOpen(true)}} className="edit-btn">Edit</button>} */}
            </div>
        </div>
     );
}
 
export default Guideline;