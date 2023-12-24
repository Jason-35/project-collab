import "./ServiceCard.css"

interface ServiceCardProps {
    title: string;
    assigned?: string;
}

const ServiceCard = ({title, assigned}: ServiceCardProps) => {


    return ( 
        <div className="service-container">
            <div className="service-card" onClick={() => console.log(title)}>
                <div className="service-title">
                    <h2>{title}</h2>
                </div>
                <div className="assigned">
                    {assigned}
                </div>
            </div>
        </div>
     );
}
 
export default ServiceCard;