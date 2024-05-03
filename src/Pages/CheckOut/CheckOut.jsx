import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const CheckOut = () => {
    const { title, price, _id, img } = useLoaderData()
    const { user } = useContext(AuthContext)

    const handleConfirmOrder = event => {
        event.preventDefault()
        const form = event.target;
        const name = form.name.value
        const date = form.date.value
        const email = user?.email
        const price = form.price.value

        const booking = {
            customerName: name,
            img,
            email,
            date,
            service: title,
            service_id: _id,
            price: price
        }

        fetch('http://localhost:5000/bookings', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Order Success!',
                        icon: 'success',
                    })
                }
            })
    }

    return (

        <div>
            <div className="card shrink-0 w-full shadow-2xl bg-base-100 py-5">
                <h3 className="text-center text-3xl">Book Services : {title}</h3>
                <form className="card-body" onSubmit={handleConfirmOrder}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name="name" defaultValue={user?.displayName} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" required />

                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" defaultValue={user?.email} className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="price" defaultValue={'$ ' + price} className="input input-bordered" required />

                        </div>


                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-block w-full">Confirm Order</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CheckOut;