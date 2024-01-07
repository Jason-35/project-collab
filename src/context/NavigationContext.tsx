import { Dispatch, SetStateAction, createContext, useState } from "react";

interface Props {
    children: React.ReactNode;
 }

 interface NavigationContextProps {
    rerender: boolean;
    setRerender: Dispatch<SetStateAction<boolean>>;
  }

export const NavigationContext = createContext<NavigationContextProps>({rerender: false, setRerender: () => {}})

export const NavigationProvider: React.FC<Props> = ({children}) => {
    const [rerender, setRerender] = useState(false)

    return (
        <NavigationContext.Provider value={{rerender, setRerender}}>
            {children}
        </NavigationContext.Provider>
    )
}