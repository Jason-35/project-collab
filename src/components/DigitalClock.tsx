import { useEffect, useState } from "react";

const DigitalClock = () => {
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 1000);
 }, [dateState]);

    return ( 
        <div className="App">
            <p>
             {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
            </p>
        </div>
     );
}
 
export default DigitalClock;