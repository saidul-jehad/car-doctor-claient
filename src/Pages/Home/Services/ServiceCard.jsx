
const ServiceCard = ({ service }) => {
    const { facility, price, description, img, title, service_id, _id } = service
    return (
        <div className="card border w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title ">{title}</h2>
                <p className="text-xl font-semibold text-orange-500">Price : ${price}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;