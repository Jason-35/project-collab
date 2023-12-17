import { Dispatch, SetStateAction, createContext, useState } from "react";

interface Props {
    children: React.ReactNode;
 }

 interface SidebarContextProps {
    openSidebar: boolean;
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
  }

export const SidebarContext = createContext<SidebarContextProps>({openSidebar: false, setOpenSidebar: () => {}})

export const SidebarProvider: React.FC<Props> = ({children}) => {
    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <SidebarContext.Provider value={{openSidebar, setOpenSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}