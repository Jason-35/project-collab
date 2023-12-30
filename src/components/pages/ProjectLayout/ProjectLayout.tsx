import DefaultLayout from "../../DefaultLayout/DefaultLayout";
import Assignment from "./Assignment/Assignment";
import Guideline from "./Guideline/Guideline";
import ChatLayout from "./ChatLayout/ChatLayout";
import Features from "./Features/Features";
import Logs from "./Logs/Logs";
import "./ProjectLayout.css"

const ProjectLayout = () => {
    
    const layout = (
        <div className="project-layout flex-1">
            <div className="project-left-column">
                <Guideline />
                <Features />
                <Logs />
                <Assignment />
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