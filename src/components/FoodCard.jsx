import React from 'react';
import { Link } from 'react-router';
import { MdLocationOn, MdDateRange } from 'react-icons/md';

const FoodCard = ({ food }) => {
    const {
        _id,
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,
        expiredDateTime,
        donorName,
        donorImage
    } = food;

    return (
        <div className="card bg-base-100 rounded-2xl border border-base-300 mx-auto transition-transform duration-300 hover:scale-105 w-full max-w-xs">
            <figure className='h-48'>
                <img
                    src={foodImage}
                    alt={foodName}
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{foodName}</h2>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="badge badge-outline md:badge-md badge-sm">Quantity: {foodQuantity}</span>
                    <span className="badge badge-info badge-outline flex items-center gap-1 md:badge-md badge-sm">
                        <MdLocationOn /> {pickupLocation}
                    </span>
                    <span className="badge badge-error badge-outline flex items-center gap-1 md:badge-md badge-sm">
                        <MdDateRange /> {expiredDateTime.replace('T', ' ')}
                    </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <img
                        src={donorImage}
                        alt={donorName}
                        className="w-8 h-8 rounded-full border"
                    />
                    <span className="text-sm">{donorName}</span>
                </div>
                <div className="card-actions mt-auto items-center justify-end">
                    <Link to={`/food/${_id}`} className="btn btn-outline btn-primary btn-sm">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;