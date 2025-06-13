import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../../components/FoodCard';

const AvailableFood = () => {
    const availableFoods = useLoaderData().data;
    const [sortOrder, setSortOrder] = useState('asc');
    

    const sortedFoods = [...availableFoods].sort((a, b) => {
        const dateA = new Date(a.expiredDateTime);
        const dateB = new Date(b.expiredDateTime);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="max-w-6xl mx-auto my-8 px-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Available Foods</h2>
                <div>
                    <label className="mr-2 font-semibold">Sort by Expire Date:</label>
                    <select
                        className="select select-bordered focus:outline-none"
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Earliest First</option>
                        <option value="desc">Latest First</option>
                    </select>
                </div>
            </div>
            {sortedFoods.length === 0 ? (
                <div className="text-center text-gray-500">No food available.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {sortedFoods.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvailableFood;