import { useNavigate, useParams } from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth, db } from "../../firebase/firebase";
import { query, collection, limit, DocumentData, addDoc, where, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getCurrentDisplayName } from "../../lib/service/UserService";
import NavigationBar from "../DefaultLayout/components/NavigationBar/NavigationBar";
import SideBar from "../DefaultLayout/components/SideBar/SideBar";
import "../../styles/ProjectLayout.css"

const ProjectLayout = () => {

    const {uuid} = useParams()

    const [members, setMembers] = useState<string[] | null>([])

    const messageRef = query(collection(db, "messages"),where("projId", "==", uuid) ,limit(10))

    const [messages] = useCollectionData(messageRef)

    const [msg, setMsg] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        // const projectRef = query
        const fetchProjectData = async() =>{
            if(uuid){
                const projectData = await getDoc(doc(db, "projectGroup", uuid))
                // console.log(projectData.data())
                const data = projectData.data()
                if(data){
                    const getMembers = data.members
                    setMembers(getMembers)
                }
            }
        }
        console.log(uuid)
        fetchProjectData()
    }, [uuid])

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    const handleSend = async() => {
        const currentUser = getCurrentDisplayName()
        await addDoc(collection(db, "messages"), {
            message: msg,
            sender: currentUser,
            projId: uuid
        })
    }

    return ( 
        <div className="container-with-nav">
            <NavigationBar />
            <SideBar />
            <div className="member-bar">
                members
                {members && members.length > 0 && members.map((mem) => (
                    <div>{mem}</div>
                ))}
            </div>
            <div>
                <div>Github repository: "github here"</div>
                <div>Rules: rules here</div>
                <div>Description: descrption here</div>

            </div>
            <div className="assignment">
                <div className="features">
                    <h4>feature assignment</h4>
                    <div><input type="text" placeholder="add features" /></div>
                    <div className="feature-assignment"></div>
                </div>
                <div className="bugs">
                    <h4>bug assignments</h4>
                    <input type="text" placeholder="add bugs" />
                    <div className="bug-assignment"></div>
                </div>
            </div>
                <div>
                    {(messages && messages.length > 0) && messages?.map((msg: DocumentData) => (
                        <div>{msg.message}</div>
                    ))}
                </div>
            
                <input onChange={(e) => {
                    e.preventDefault()
                    setMsg(e.target.value)
                }} type="text" />
                <button onClick={handleSend}>send</button>

        </div>
     );
}
 
export default ProjectLayout;