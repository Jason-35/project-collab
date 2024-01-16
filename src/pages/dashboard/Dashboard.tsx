import { Authorization } from "@/lib/helper/authentication";
import { useLoading } from "@/provider/Loading/loading-hook";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const { loading, startLoading, stopLoading } = useLoading()
  const hold = true

  useEffect(() => {
    startLoading()
    
    const unsub = Authorization(navigate)


    stopLoading()
    return unsub;
  })


    return ( 
       <div>
          {loading ? <Loader2 size={128}/> : hold ? <div></div> : <div></div>}
        </div>
     );
}
 
export default Dashboard;