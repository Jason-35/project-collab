import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Logs.css"
import "../HelperComponent/common.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLogs } from "../../../../lib/service/ProjectGroupService";

interface log {
    task: string;
    user: string
    action: string
}

const Logs = () => {
    const { uuid } = useParams()

    const [logs, setLogs] = useState([])

    useEffect(() => {
        const getLog = async() =>{
            const logsArray = await getLogs(String(uuid))
            if(logsArray.length !== logs.length){
                setLogs(logsArray)
            }
        } 

        getLog()
    })

    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Logs"/>
                <div className="cards no-scrollbar no-scroll">
                    {logs && logs.length > 0 && logs.map((log: log, index) => (
                        <ServiceCard key={index} type="logs" title={log.task} assigned={`${log.user} ${log.action}`} click={false}/>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Logs;