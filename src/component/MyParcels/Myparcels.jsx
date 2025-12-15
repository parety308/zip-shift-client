import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { MdOutlinePageview } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const Myparcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center">Loading...</p>;
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Parcel has been deleted.",
                            icon: "success"
                        });

                    })
                    .catch(err => console.log(err));
            }
        });
    }
    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);
        window.location.assign(res.data.url);
    }
    return (
        <div>
            <h2 className="text-3xl text-center font-semibold">
                All of my parcels : {parcels.length}
            </h2>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-10/12 mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-center text-black">Product No</th>
                            <th className="text-center text-black">Name</th>
                            <th className="text-center text-black">Total Cost</th>
                            <th className="text-center text-black">Payment Status</th>
                            <th className="text-center text-black">Delivery Status</th>
                            <th className="text-center text-black">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((p, index) => (
                                <tr key={p._id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{p.parcelName}</td>
                                    <td className="text-center">{p.cost}</td>
                                    <td className="text-center">
                                        {
                                            p.paymentStatus === 'paid' ? <span className=" btn bg-blue-100">Paid</span> :
                                                <button onClick={() => { handlePayment(p) }} className="btn bg-lime-400 ">Pay</button>
                                        }
                                    </td>
                                    <td className="text-center">
                                        {
                                            p.deliveryStatus === 'deliveried' ? <span className="text-yellow-400 btn btn-outline">Deliveried</span> :
                                                <span className="text-blue-400 btn btn-outline">Pending</span>
                                        }
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-square mr-1 hover:bg-lime-300"><MdOutlinePageview /></button>
                                        <button className="btn btn-square mr-1 hover:bg-lime-300"><FaRegEdit /></button>
                                        <button onClick={() => handleDelete(p._id)} className="btn btn-square mr-1 hover:bg-lime-300"><FaRegTrashAlt /></button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Myparcels;
