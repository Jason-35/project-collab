import { createContext, useState } from "react";

interface LoadingProps {
    children: React.ReactNode;
 }

 interface LoadingProviderProps {
    loading: boolean
    startLoading: () => void;
    stopLoading: () => void;
  }

export const LoadingProviderContext = createContext<LoadingProviderProps | undefined>(undefined);

export const LoadingProvider = ({ children }: LoadingProps) => {
    const [loading, setLoading] = useState(false);
  
    const startLoading = () => {
      setLoading(true);
      console.log("loading....")
    };
  
    const stopLoading = () => {
      setLoading(false);
      console.log("done")
    };
  
    return (
      <LoadingProviderContext.Provider value={{ loading, startLoading, stopLoading }}>
        {children}
      </LoadingProviderContext.Provider>
    );
  };