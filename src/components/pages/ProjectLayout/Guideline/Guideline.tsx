// import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Guideline.css"
import "../HelperComponent/common.css"

const Guideline = () => {
    return ( 
        <div className="common-component">
            <div className="common-container">
                <Headings title="Guideline"/>
                Make these editable
                <div>
                    Room Name
                </div>
                <div>
                    Repository
                </div>
                <div>
                    Description
                </div>
                <div>
                    Rules
                </div>
            </div>
        </div>
     );
}
 
export default Guideline;