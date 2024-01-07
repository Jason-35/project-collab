import { DocumentData, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import './Explore.css'
import { useEffect, useState } from 'react';
import { getAllProjectGroups } from '../../../../lib/service/ProjectGroupService';
import DefaultModal from '../../../DefaultLayout/components/Modal/DefaultModal';
import { auth, db } from '../../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { db_collections } from '../../../../constants/constant';
import { getCurrentDisplayName, getCurrentUserUid } from '../../../../lib/service/UserService';

const Explore = () => {
    const [projects, setProjects] = useState<DocumentData>([])
    const [open, setOpen] = useState(false)
    const [selectedProj, setSelectedProj] = useState<DocumentData | null>(null)
    const [projTitle, setProjTitle] = useState("")

    const navigate = useNavigate()

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    useEffect(() => {
        const fetchData = async() => {
            const projectData = await getAllProjectGroups()
            if(projectData) setProjects(projectData)
        }

        fetchData()
    }, [])

    const handleRequest = async() => {
        const createdAt = new Date()
        const currentUserName = getCurrentDisplayName()
        const userId = getCurrentUserUid()
        const msgId = uuid()
        if(selectedProj){
            await updateDoc(doc(db, db_collections.USERS, selectedProj.ownerId), {
                    notification: arrayUnion({
                    msgId: msgId,
                    from: currentUserName,
                    fromId: userId,
                    message: `${currentUserName} wants to join project ${projTitle}`,
                    joining: selectedProj.projectData.projectName,
                    type: "request",
                    read: false,
                    createdAt: createdAt,
                    projUrl: selectedProj.url
                })
            })
        }

        setOpen(false)
    }

    const button = (<button onClick={handleRequest}>Request</button>)

    const handleModal = (proj: DocumentData) => {
        setProjTitle(proj.projectData.projectName)
        setOpen(true)
        setSelectedProj(proj)
    }

    return ( 
        <div className="explore-container">
            {projects && projects.map((proj: DocumentData, index:number) => (
                <div key={index} className="explore-card" onClick={() => handleModal(proj)}>
                    <div className="explore-recommendation-header">
                        <div className='item1'>
                            <h2 className="explore-header-title">{proj.projectData.projectName}</h2>
                            <h3>owner: {proj.owner}</h3>
                            <h3>{proj.members.length} / {proj.projectData.max}</h3>
                        </div>
                        <div className='item2'>
                            <h2>{proj.projectData.level}</h2>
                        </div>
                    </div>
                    <div className="divider" / >
                    <div>
                        <div className="explore-description-container">
                            <div className="explore-description">
                                <p>{proj.projectData.description}</p>
                            </div>
                        </div>
                        <div className="explore-skills-container">
                            <div className="explore-skills">
                                {proj.projectData.tags.map((tag: string, index: number) => (
                                    <p key={index}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <DefaultModal open={open} setOpen={setOpen} title={`Join Request for ${projTitle}`} buttons={button} content={<div>Do you want to send a request to join this project?</div>}/>



            {/*  */}
            {/* <div className='pagination middle'>
                <button>Prev</button>
                <button>Next</button>
            </div> */}
            {/*  */}
            {/* <div className='pagination first-last'>
                <button>Prev</button>
                <button>Next</button>
            </div> */}
        </div>
     );
}
 
export default Explore;