import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Assignment.css"
import "../HelperComponent/common.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectFeature } from "../../../../lib/service/ProjectGroupService";
import { getCurrentDisplayName } from "../../../../lib/service/UserService";



interface FeatureFields {
    name: string;
    description: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
    assigned: string
}


const Assignment = () => {

    const { uuid } = useParams()

    const [assignments, setAssignment] = useState([])

    useEffect(() => {
        const getAssignment = async() => {
            const user = getCurrentDisplayName()
            const AllFeatures = await getProjectFeature(String(uuid))
            if(AllFeatures){
                const filtered = AllFeatures.filter((task: FeatureFields) => task.assigned === user)
                if(filtered.length !== assignments.length){
                    setAssignment(filtered)
                }
            } 
        }

        getAssignment()
    })
    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Assignments"/>
                <div className="cards no-scrollbar no-scroll">
                    {assignments && assignments.length > 0 && assignments.map((task: FeatureFields, index) => (
                        <ServiceCard desc={task.description} key={index} type="assignment" title={task.name} assigned={task.assigned}/>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Assignment;