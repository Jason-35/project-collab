import "./Recommendation.css"

const Recommendation = () => {
    return ( 
        <div className="recommendation-component">
            <h1>Recommendation</h1>
            <div className="divider" />
            <div className="recommendation-card-container no-scroll">
                <div className="recommendation-card">
                    <div className="recommendation-header">
                        <h2 className="header-title">Awsome Project! long title</h2>
                        <h3>owner: john doe</h3>
                        <h3>0 / 5</h3>
                    </div>
                    <div className="divider" / >
                    <div>
                        <div className="description-container">
                            <div className="description">
                                <p>This is an awsome project</p>
                            </div>
                        </div>
                        <div className="skills-container">
                            <div className="skills">
                                <p>react</p>
                                <p>node</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="recommendation-card">
                    <div className="recommendation-header">
                        <h2 className="header-title">MY project is better</h2>
                        <h3>owner: john goe</h3>
                        <h3>0 / 5</h3>
                    </div>
                    <div className="divider" / >
                    <div>
                        <div className="description-container">
                            <div className="description">
                                <p>This is an awsome project that is better than john does project come join mine</p>
                            </div>
                        </div>
                        <div className="skills-container">
                            <div className="skills">
                                <p>react</p>
                                <p>node</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="recommendation-card">
                    <div className="recommendation-header">
                        <h2 className="header-title">Awsome Project! long title</h2>
                        <h3>owner: john doe</h3>
                        <h3>0 / 5</h3>
                    </div>
                    <div className="divider" / >
                    <div>
                        <div className="description-container">
                            <div className="description">
                                <p>This is an awsome project</p>
                            </div>
                        </div>
                        <div className="skills-container">
                            <div className="skills">
                                <p>react</p>
                                <p>node</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="recommendation-card">
                    <div className="recommendation-header">
                        <h2 className="header-title">Awsome Project! long title</h2>
                        <h3>owner: john doe</h3>
                        <h3>0 / 5</h3>
                    </div>
                    <div className="divider" / >
                    <div>
                        <div className="description-container">
                            <div className="description">
                                <p>This is an awsome project</p>
                            </div>
                        </div>
                        <div className="skills-container">
                            <div className="skills">
                                <p>react</p>
                                <p>node</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Recommendation;