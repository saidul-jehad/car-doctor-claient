import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        fetch('https://car-doctor-server-2-seven.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])


    return (
        <div>
            <div className='text-center space-y-3 mt-9'>
                <h3 className='text-2xl font-bold text-orange-600'> Service {services.length}</h3>
                <h3 className='text-5xl font-bold'>Our Service Area</h3>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {
                    services.map(service => <ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;