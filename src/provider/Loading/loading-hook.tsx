import { useContext } from "react"
import { LoadingProviderContext } from "./loading-provider"

export const useLoading = () => {
  const context = useContext(LoadingProviderContext)
  if (context === undefined)
    throw new Error("LoadingProvider Error")
  
  return context
}