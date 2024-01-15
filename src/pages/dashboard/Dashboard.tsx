import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
    return ( 
       <Button onClick={() => signOut(auth)}>signout</Button>
     );
}
 
export default Dashboard;