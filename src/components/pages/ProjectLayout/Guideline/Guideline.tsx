// import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Guideline.css"
import "../HelperComponent/common.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentData, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";
import { getCurrentUserUid } from "../../../../lib/service/UserService";
import DefaultModal from "../../../DefaultLayout/components/Modal/DefaultModal";



const Guideline = () => {
    const {uuid} = useParams()
    const [project, setProject] = useState<DocumentData>() 
    const currentUser = getCurrentUserUid()
    const [open, setOpen] = useState(false)
    const [repository, setRepository] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()
    useEffect(() => {
        const getProjData = async() => {
            const projData = await getDoc(doc(db, "projectGroup", String(uuid)))
            if(project === undefined){
                const data = projData.data()
                if(data){
                    setProject(data)
                    if(repository === ""){
                        setRepository(data.projectData.repository)
                    }
                    if(description === ""){
                        setDescription(data.projectData.description)
                    }
                }
            }
        } 
        getProjData()
    })

    const handleSave = async() => {
        await updateDoc(doc(db, "projectGroup", String(uuid)), {
            "projectData.description" : description,
            "projectData.repository" : repository
        })
        setOpen(false)
    }

    const handleDelete = async() => {
        if(project){
            project.members.forEach(async(member: {user:string, userId:string}) => {
                const userDoc = await getDoc(doc(db,"users", member.userId))
                if(userDoc){
                    const userMember = userDoc.data()?.memberOfProject
                    const memberCopy = userMember.filter((proj: {projectUrl: string}) => proj.projectUrl.split("/")[2] !== String(uuid))
    
                    await updateDoc(doc(db,"users", member.userId), {
                        memberOfProject: memberCopy
                    })
                }
                
                
            })
            await deleteDoc(doc(db,"projectGroup", String(uuid)))
            setOpen(false)
            navigate("/home")

        }
    }

    const handleLeave = async() => {
        const currentUserId = getCurrentUserUid()
        const userDoc = await getDoc(doc(db,"users", currentUserId))
        if(userDoc){
            const userMember = userDoc.data()?.memberOfProject
            const memberCopy = userMember.filter((proj: {projectUrl: string}) => proj.projectUrl.split("/")[2] !== String(uuid))

            await updateDoc(doc(db,"users", currentUserId), {
                memberOfProject: memberCopy
            })
        }

        const projectDoc = await getDoc(doc(db, "projectGroup", String(uuid)))
        if(projectDoc){
            const projectMember = projectDoc.data()?.members
            const memberCopy = projectMember.filter((proj: {userId: string}) => proj.userId !== currentUserId)
            await updateDoc(doc(db, "projectGroup", String(uuid)), {
                members: memberCopy
            })
        }

        navigate("/home")
    }

    const formContent = (
        <div>
            <div className="form-center">
                <label>Repository</label>
                <input type="text" value={repository} onChange={(e) => setRepository(e.target.value)}/>
            </div>
            <div className="form-center">
                <label>Description</label>
                <textarea cols={40} rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>
    )

    const editBtn = (
        <div>
            <button onClick={handleSave}>save</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    )

    

    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Guideline"/>
                <div className="guideline-text">
                    Room Name: {project && project.projectData.projectName}
                </div>
                <div className="guideline-text">
                    Repository: {repository}
                </div>
                <div className="guideline-text">
                    Description: <br/> {description}
                </div>
                <DefaultModal title={"Guideline"} open={open} setOpen={setOpen} content={formContent} buttons={editBtn}/>
                {currentUser === project?.ownerId && <button onClick={(e) => {
                    e.stopPropagation()
                    setOpen(true)
                }} className="edit-btn">Edit</button>}
                {currentUser !== project?.ownerId && <button onClick={handleLeave} className="edit-btn">Leave</button>}
            </div>
        </div>
     );
}
 
export default Guideline;