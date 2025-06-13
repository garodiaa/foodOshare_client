import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import MyFoodCard from '../../components/MyFoodCard';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyFood = () => {
    const initialFoods = useLoaderData().data;
    const [foods, setFoods] = useState(initialFoods);
    const axiosSecure = useAxiosSecure();

    // Update food handler
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
        <div className="max-w-4xl mx-auto my-8 px-4">
            <h2 className="text-2xl font-bold mb-6">My Foods</h2>
            {foods.length === 0 ? (
                <div className="text-center text-gray-500">No foods found.</div>
            ) : (
                foods.map(food => (
                    <MyFoodCard
                        key={food._id}
                        food={food}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))
            )}
        </div>
    );
};

export default MyFood;