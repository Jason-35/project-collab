import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Logs.css"
import "../HelperComponent/common.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

interface log {
    task: string;
    user: string
    action: string
}

const Logs = () => {
    const { uuid } = useParams()

    const [logs, setLogs] = useState([])

    useEffect(() => {
        onSnapshot(doc(db, "projectGroup", String(uuid)) , (doc) => {
            const logArray = doc.data()?.logs
            if(logArray.length !== logs.length){
                setLogs(logArray)
            }
        })
    })

    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Logs"/>
                <div className="cards no-scrollbar no-scroll">
                    {logs && logs.length > 0 && logs.map((log: log, index) => (
                        <ServiceCard id="" key={index} type="logs" title={log.task} assigned={`${log.user} ${log.action}`} click={false}/>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default Logs;