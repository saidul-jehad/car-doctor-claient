import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])

    const url = `http://localhost:5000/bookings/?email=${user?.email}`
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBookings(data)
            })
    }, [])

    const handleDelete = id => {

        Swal.fire({
            title: "Do you want to delete this booking",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(" delete Successfull");
                            console.log(data);

                            const remaining = bookings.filter(booking => booking._id !== id)
                            setBookings(remaining)
                        }
                    })
            }
        });
    }

    const handleBookingConfirm = id => {
        Swal.fire({
            title: "Do you want to Confirm this booking",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ status: "confirm" })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            Swal.fire(" Confirm Successfull");
                            console.log(data);

                            const remaining = bookings.filter(booking => booking._id !== id)
                            const updated = bookings.find(booking => booking._id === id)
                            updated.status = "confirm"

                            const newBookings = [updated, ...remaining];
                            setBookings(newBookings)
                        }
                    })
            }
        });
    }

    return (
        <div>

            <h3 className="text-3xl">Your Bookings {bookings.length}</h3>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-200">
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Image</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookings.map(booking => <BookingRow
                                    key={booking._id}
                                    booking={booking}
                                    handleDelete={handleDelete}
                                    handleBookingConfirm={handleBookingConfirm}
                                ></BookingRow>)
                            }



                        </tbody>
                        {/* foot */}


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;