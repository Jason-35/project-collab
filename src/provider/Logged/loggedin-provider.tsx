import { Authorization } from "@/lib/helper/authentication";
import { createContext, useEffect, useState } from "react";

interface LoggedProps {
    children: React.ReactNode;
 }

 interface LoggedProviderProps {
    loggedIn: boolean
  }

export const LoggedProviderContext = createContext<LoggedProviderProps | undefined>(undefined);

export const LoggedInProvider = ({ children }: LoggedProps) => {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
      const unsub = Authorization(setLoggedIn)
      return unsub;
    }, [])
  
    return (
      <LoggedProviderContext.Provider value={{ loggedIn }}>
        {children}
      </LoggedProviderContext.Provider>
    );
  };