import { useContext } from "react";
import { NavigationContext } from "../../context/NavigationContext";

export const useRerender = () => {
    const context = useContext(NavigationContext)
    if(!context){
        console.log("NO CONTEXT ERROR")
    }
    return context;
}