import "./HeroBanner.css"
import team from "../../../../assets/team.svg"
import build from "../../../../assets/build.svg"
import fun from "../../../../assets/fun.svg"

const HeroBanner = () => {
    return ( 
        <div className="hero-banner">
            <ul className="slider">
                <li>
                    <img src={team} alt="" />
                    <h4>Community</h4>
                </li>
                <li>
                    <img src={build} alt="" />
                    <h4>Create</h4>
                </li>
                <li>
                    <img src={fun} alt="" />
                    <h4>Fun</h4>
                </li>
                <li>
                    <img src={team} alt="" />
                    <h4>Community</h4>
                </li>
            </ul>
        </div>
     );
}
 
export default HeroBanner;