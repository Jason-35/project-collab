import { useOpenSidebar } from "../lib/hooks/sidebar-hook";
import "../styles/Sidebar.css"

const SideBar = () => {
    const { openSidebar, setOpenSidebar } = useOpenSidebar()

    const handleCloseSidebar = (event: React.MouseEvent) => {
        const clickedElement = event.target as HTMLElement
        const elementClass = clickedElement.classList.value
        if(elementClass === "transparent-sheet"){
            setOpenSidebar(false)
        }
    } 

    let showSidebar = <></>
    if(openSidebar){
        showSidebar = (
            <div onClick={handleCloseSidebar} className="transparent-sheet">
                <div className="sidebar-container">
                    <div onClick={() => setOpenSidebar(false)}>X</div>
                    <p>Profile</p>
                    <p>Notification</p>
                    <p>Explore</p>
                    <p>Friends</p>
                </div>
            </div>
        )
    }

    return ( 
        showSidebar
     );
}
 
export default SideBar;