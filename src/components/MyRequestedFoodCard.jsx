import React from 'react';

const MyRequestedFoodCard = ({ food }) => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 border border-base-300 rounded-xl bg-base-100 mb-4">
            <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-24 h-24 object-cover rounded-lg border border-base-300 "
            />
            <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{food.foodName}</h3>
                <div className="flex flex-wrap gap-2 mb-1">
                    <span className="badge badge-outline">Quantity: {food.foodQuantity}</span>
                    <span className="badge badge-info badge-outline">Pickup: {food.pickupLocation}</span>
                    <span className="badge badge-error badge-outline">
                        Expires: {food.expiredDateTime.replace('T', ' ')}
                    </span>
                </div>
                <div className="mb-1">
                    <span className="font-semibold">Request Date: </span>
                    {food.requestedDate ? new Date(food.requestedDate).toLocaleString() : 'N/A'}
                </div>
                <div className="mb-1">
                    <span className="font-semibold">Notes: </span>
                    {food.additionalNotes || 'None'}
                </div>
                <div className="mt-2">
                    <div className="font-semibold mb-1">Donor :</div>
                    <div className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                        <img
                            src={food.donorImage}
                            alt={food.donorName}
                            className="w-10 h-10 rounded-full border"
                        />
                        <div>
                            <div className="font-semibold">{food.donorName}</div>
                            <div className="text-sm text-gray-500">{food.donorEmail}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRequestedFoodCard;