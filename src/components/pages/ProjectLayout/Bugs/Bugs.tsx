import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Bugs.css"
import "../HelperComponent/common.css"

const Bugs = () => {
    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Bugs"/>
                <div className="cards no-scrollbar no-scroll">
                    <ServiceCard title="Falco" assigned="bawk"/>
                </div>
            </div>
        </div>
     );
}
 
export default Bugs;