import { useContext } from "react";
import { SidebarContext } from "../../context/SidebarContext";

export const useOpenSidebar = () => {
    const context = useContext(SidebarContext)
    if(!context){
        console.log("NO CONTEXT ERROR")
    }
    return context;
}