import React, { useContext } from 'react';
import MyRequestedFoodCard from '../../components/MyRequestedFoodCard';
import { AuthContext } from '../../providers/AuthProvider';
import { useQuery } from "@tanstack/react-query";
import Loading from '../../components/Loading';
import Error from '../public/Error';
import { getSecureAxios } from '../../utils/getSecureAxios';

const MyFoodRequest = () => {
    // const data = useLoaderData().data;
    const { user } = useContext(AuthContext);

    const { data = [], isLoading, error } = useQuery({
        enabled: !!user?.email, // Only run the query if user email is available
        queryKey: ['myFoodRequests', user?.email],
        queryFn: async () => {
            const axiosSecure = await getSecureAxios(user);
            const res = await axiosSecure.get(`/foods/requestedBy/${user.email}`);
            return res.data;
        },
    });

    

    if (isLoading) {
        return <Loading></Loading>
    }
    if (error)
    {
        return <Error></Error>
    }


    return (
        <div className="max-w-3xl mx-auto my-8 px-4">
            <h2 className="text-2xl font-bold mb-6">My Food Requests</h2>
            {data.length === 0 ? (
                <div className="text-center text-gray-500">No food requests found.</div>
            ) : (
                data.map(food => (
                    <MyRequestedFoodCard key={food._id} food={food} />
                ))
            )}
        </div>
    );
};

export default MyFoodRequest;