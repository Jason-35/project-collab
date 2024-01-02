import { User } from "lucide-react";
import "./Members.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentProject } from "../../../../../lib/service/ProjectGroupService";

const Members = () => {
    const { uuid } = useParams()
    const [members, setMembers] = useState([])
    useEffect(() => {
        console.log(uuid)
        const getMembers = async() => {
            if(uuid){
                const projectDoc = await getCurrentProject(uuid)
                if(projectDoc)
                setMembers(projectDoc.members)
            } 
        }   

        getMembers()
    }, [uuid, members.length])

    console.log(members)
    return ( 
        <div className="members-container">
            {members && members.length > 0 && members.map((member, index) => (
                <p key={index}><span><User/></span>{member["user"]}</p>
            ))}
        </div>
     );
}
 
export default Members;