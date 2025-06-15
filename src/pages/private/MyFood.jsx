import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import MyFoodCard from '../../components/MyFoodCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import { getSecureAxios } from '../../utils/getSecureAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading';
import Error from '../public/Error';

const MyFood = () => {
    const { user } = useContext(AuthContext);
    // const initialFoods = useLoaderData().data;

    const { data = [], isLoading, error } = useQuery({
        enabled: !!user?.email, // Only run the query if user email is available
        queryKey: ['myFood', user?.email],
        queryFn: async () => {
            const axiosSecure = await getSecureAxios(user);
            const res = await axiosSecure.get(`/foods/user/${user.email}`);
            return res.data;
        },
    });


    const [foods, setFoods] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setFoods(data);
    }, [data]);

    // console.log("MyFood foods", foods);

    if (isLoading) {
        return <Loading></Loading>
    }
    if (error) {
        return <Error></Error>
    }


    const handleUpdate = async (id, updatedData, onSuccess) => {
        try {
            await axiosSecure.patch(`/foods/${id}`, updatedData);
            setFoods(foods.map(f => f._id === id ? { ...f, ...updatedData } : f));
            if (onSuccess) onSuccess();
        } catch {
            // Optionally show error toast
        }
    };

    // Delete food handler
    const handleDelete = async (id, onSuccess) => {
        try {
            await axiosSecure.delete(`/foods/${id}`);
            setFoods(foods.filter(f => f._id !== id));
            if (onSuccess) onSuccess();
        } catch {
            // Optionally show error toast
        }
    };

    return (
        <div className="max-w-6xl mx-auto my-8 px-4">
            <h2 className="text-2xl font-bold mb-6">My Foods</h2>
            {foods.length === 0 ? (
                <div className="text-center text-gray-500">No foods found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {foods.map(food => (
                        <MyFoodCard
                            key={food._id}
                            food={food}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFood;