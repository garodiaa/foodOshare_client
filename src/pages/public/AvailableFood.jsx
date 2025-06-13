import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../../components/FoodCard';

const AvailableFood = () => {
    const allFoods = useLoaderData().data;
    const [sortOrder, setSortOrder] = useState('asc');
    const [search, setSearch] = useState('');

    // Only show foods with status "available"
    const availableFoods = allFoods.filter(food => food.foodStatus === 'available');

    // Search by food name (case-insensitive)
    const searchedFoods = availableFoods.filter(food =>
        food.foodName.toLowerCase().includes(search.toLowerCase())
    );

    // Sorting by expire date
    const sortedFoods = [...searchedFoods].sort((a, b) => {
        const dateA = new Date(a.expiredDateTime);
        const dateB = new Date(b.expiredDateTime);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="max-w-6xl mx-auto my-8 px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Available Foods</h2>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                    <input
                        type="text"
                        placeholder="Search by food name"
                        className="input input-bordered focus-within:border-none input-sm w-full max-w-xs"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="select focus-within:border-none select-bordered select-sm"
                        value={sortOrder}
                        onChange={e => setSortOrder(e.target.value)}
                    >
                        <option value="" disabled>
                            Sort by Expiry Date
                        </option>
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