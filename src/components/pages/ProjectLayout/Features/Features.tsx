import ServiceCard from "../HelperComponent/ServiceComponent/ServiceCard";
import Headings from "../HelperComponent/headings/Headings";
import "./Features.css"
import "../HelperComponent/common.css"

const Features = () => {
    return ( 
        <div className="common-component">
            <div className="common-container">
                <div className="cards no-scrollbar no-scroll">
                    <Headings title="Features" />
                    <ServiceCard title="macro" assigned="moll"/>
                </div>
            </div>
        </div>
     );
}
 
export default Features;