import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";


const Myparcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text-3xl text-center font-semibold">All of my parcels : {parcels.length}</h2>
        </div>
    );
};

export default Myparcels;