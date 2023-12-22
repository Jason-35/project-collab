import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../DefaultLayout/DefaultLayout";
import { auth } from "../../../firebase/firebase";
import { useState } from "react";
import Recommendation from "./components/Recommendation/Recommendation";
import Bugs from "./components/Bugs/Bugs";
import Assignments from "./components/Assignments/Assignments";
import "./HomeLayout.css"


const HomeLayout = () => {

    const navigate = useNavigate()

    const [width, setWidth] = useState(window.innerWidth)
    // const [pageType, setPageType] = useState<string>("recommend")

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
    })

    auth.onAuthStateChanged((user) => {
        if(!user){
            navigate("/login")
        }
    })

    let layout = <></>

    if(width < 1200){
        layout = (
            <div>Hello</div>
        )
    }else {
        layout = (
            <div className="home-layout">
                <div className="home-right-layout">
                    <Recommendation />
                </div>
                <div className="home-left-layout">
                    <Bugs />
                    <Assignments />
                </div>
            </div>
        )
    }


    return ( 
        <DefaultLayout component={layout} />
     );
}
 
export default HomeLayout;