import DefaultLayout from "../../DefaultLayout/DefaultLayout";
import Assignment from "./Assignment/Assignment";
import Guideline from "./Guideline/Guideline";
import ChatLayout from "./ChatLayout/ChatLayout";
import Features from "./Features/Features";
import Logs from "./Logs/Logs";
import "./ProjectLayout.css"
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectLayout = () => {
    const navigate = useNavigate()
    const [rerender, setRerender] = useState(false)
    const [updatedAssignment, setUpdatedAssignment] = useState(false)

    

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })
    
    const layout = (
        <div className="project-layout flex-1">
            <div className="project-left-column">
                <Guideline />
                <Features rerender={rerender} setRerender={setRerender} updatedAssignment={updatedAssignment} setUpdatedAssignment={setUpdatedAssignment} />
                <Logs />
                <Assignment rerender={rerender} setRerender={setRerender} updatedAssignment={updatedAssignment} setUpdatedAssignment={setUpdatedAssignment}/>
            </div>
            <div className="project-right-column">
                <ChatLayout />
            </div>
        </div>
    )

    return (
        <DefaultLayout component={layout} /> 
    );
}
 
export default ProjectLayout;