import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Assignment.css"
import "../HelperComponent/common.css"

const Assignment = () => {
    return ( 
        <div className="common-component">
            <div className="common-container">
                <div className="cards no-scrollbar no-scroll">
                    <Headings title="Assignments"/>
                    <ServiceCard title="Falco" assigned="bawk"/>
                </div>
            </div>
        </div>
     );
}
 
export default Assignment;