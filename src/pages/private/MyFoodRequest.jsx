import React from 'react';
import { useLoaderData } from 'react-router';
import MyRequestedFoodCard from '../../components/MyRequestedFoodCard';

const MyFoodRequest = () => {
    const data = useLoaderData().data;

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