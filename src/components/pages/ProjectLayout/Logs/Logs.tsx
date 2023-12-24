import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Logs.css"
import "../HelperComponent/common.css"

const Logs = () => {
    return ( 
        <div className="common-component">
            <div className="common-container">
                <div className="cards no-scrollbar no-scroll">
                    <Headings title="Logs"/>
                    <ServiceCard title="Falco" assigned="bawk"/>
                </div>
            </div>
        </div>
     );
}
 
export default Logs;