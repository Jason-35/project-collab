import "./Bugs.css"

const Bugs = () => {
    return ( 
        <div className="bug-component">
            <h1>Bugs</h1>
            <div className="divider-nm" />
            <div className="bug-card-container no-scroll">
                <div className="bug-card">
                    <div className="bug-card-description">
                        <h3>This display is not rendering A really long display :DDDDD:DDDDD:DDDDD</h3>
                        <p>John moe from project awsome!</p>
                    </div>
                    <div className="bug-view">
                        <button>View</button>
                    </div>
                </div>
                {/*  */}
                <div className="divider-nm" />
                {/*  */}
                <div className="bug-card">
                    <div className="bug-card-description">
                        <h3>This display is not rendering</h3>
                        <p>John moe from project awsome!</p>
                    </div>
                    <div className="bug-view">
                        <button>View</button>
                    </div>
                </div>
                {/*  */}
                <div className="divider-nm" />
            </div>
        </div>
     );
}
 
export default Bugs;