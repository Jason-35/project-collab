import { useContext } from "react"
import { LoggedProviderContext } from "./loggedin-provider"


export const useLoggedIn = () => {
  const context = useContext(LoggedProviderContext)
  if (context === undefined)
    throw new Error("LoggedProvider Error")
  
  return context
}