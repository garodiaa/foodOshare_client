import React from 'react';
import { Link } from 'react-router';
import FoodCard from './FoodCard';

const FeaturedFood = ({foods}) => {
    // console.log(foods);
    return (
         <div className='max-w-6xl mx-auto my-8 px-4'>
            <h1 className='text-3xl text-center font-bold my-10'>Featured Foods</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {
                    foods.map(food => (
                        <FoodCard key={food._id} food={food}></FoodCard>
                    ))
                }
            </div>

            <div className='flex justify-center'>
                <Link to='/available-foods' className='btn btn-primary mx-auto mt-5'>
                    See All Foods
                </Link>
            </div>

        </div>
    );
};

export default FeaturedFood;