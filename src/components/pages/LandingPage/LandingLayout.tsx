import { useNavigate } from "react-router-dom";
import HeroBanner from "./HeroBanner/HeroBanner";
import "./LandingLayout.css"

const LandingLayout = () => {
    const navigate = useNavigate()
    return ( 
        <div className="landing-container">
            <HeroBanner />
            <div className="try-button" onClick={() => navigate("/login")}>
                <h1>Try it out!</h1>
            </div>
        </div>
     );
}
 
export default LandingLayout;