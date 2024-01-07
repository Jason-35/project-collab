import { useEffect, useState } from "react";
import "./Recommendation.css"
import { getAllProjectGroups } from "../../../../../lib/service/ProjectGroupService";
import { getCurrentUserDocument } from "../../../../../lib/service/UserService";
import { DocumentData } from "firebase/firestore";

const Recommendation = () => {
    const [recommend, setRecommend] = useState<DocumentData[]>([])
    useEffect(() => {
        const getRecommendedProjects = async() =>{
            const projects = await getAllProjectGroups()
            const userLevel = await getCurrentUserDocument()
            if(userLevel && projects){
                const filteredProject = projects.filter((proj) => proj.projectData.level === userLevel.level)
                if(recommend.length !== filteredProject.length){
                    setRecommend(filteredProject)
                }
            }

        } 

        getRecommendedProjects()
    })

    return ( 
        <div className="recommendation-component">
            <h1>Recommendation</h1>
            <div className="divider" />
            <div className="recommendation-card-container no-scroll">
                {recommend && recommend.length > 0 && recommend.map((proj, index) => (
                <div key={index} className="recommendation-card">
                    <div className="recommendation-header">
                        <h2 className="header-title">{proj.projectData.projectName}</h2>
                        <h3>owner: {proj.owner}</h3>
                        <h3>{proj.projectData.tags.length} / {proj.projectData.max}</h3>
                    </div>
                    <div className="divider" / >
                    <div>
                        <div className="description-container">
                            <div className="description">
                                <p>{proj.projectData.description}</p>
                            </div>
                        </div>
                        <div className="skills-container">
                            <div className="skills">
                                {proj.projectData.tags.map((tag:string, index:number) => (
                                    <p key={index}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
                {/*  */}
            </div>
        </div>
     );
}
 
export default Recommendation;