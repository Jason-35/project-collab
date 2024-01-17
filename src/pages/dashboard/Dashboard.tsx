// import { Authorization } from "@/lib/helper/authentication";
import DigitalClock from "@/components/DigitalClock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoading } from "@/provider/Loading/loading-hook";
import { useLoggedIn } from "@/provider/Logged/loggedin-hook";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate()
  const { loading, startLoading, stopLoading } = useLoading()
  const { loggedIn } = useLoggedIn()

  let setup = true

  useEffect(() => {
    startLoading()
    if(loggedIn === false){
      console.log(loggedIn)
      // navigate("/login") 
      console.log("loggin you out")
    }

    stopLoading()
  })

  const content = setup ?  (
    <Card className="border border-orange-300">
      <CardContent className="border border-red-500 grid grid-cols-3 justify-items-center">
        <Card>
          <CardTitle>Recommendation</CardTitle>
        </Card>
        <Card>
          <CardTitle>Assignments</CardTitle>
        </Card>
        <Card >
          <CardTitle><DigitalClock/></CardTitle>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardTitle>Reminder</CardTitle>
        </Card>
        <Card>
          <CardTitle>Notes</CardTitle>
        </Card>
        <Card>
          <CardTitle>Calendor</CardTitle>
        </Card>
      </CardContent>
    </Card>
  ) : (
    <></>
  )

    return ( 
       <div>
          {loading ? <Loader2 size={128}/> : content}
        </div>
     );
}
 
export default Dashboard;