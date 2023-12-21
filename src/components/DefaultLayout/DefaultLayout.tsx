import SideBar from "./components/SideBar/SideBar"
import NavigationBar from "./components/NavigationBar/NavigationBar"
import "./DefaultLayout.css"

interface DefaultLayoutProps {
    component: JSX.Element
}

const DefaultLayout = ({component}: DefaultLayoutProps) => {

    return ( 
        <div className="container-with-nav">
            <SideBar />
            <NavigationBar />
            {component}
        </div>
     );
}
 
export default DefaultLayout;