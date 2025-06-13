import React from 'react';
import { useLoaderData } from 'react-router';
import Banner from '../../components/Banner';
import FeaturedFood from '../../components/FeaturedFood';
import RemoveHunger from '../../components/RemoveHunger';
import DonateNow from '../../components/DonateNow';
import Info from '../../components/Info';

const Home = () => {
    const featuredFoods = useLoaderData().data;
    // console.log(featuredFoods);
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedFood foods={featuredFoods}></FeaturedFood>
            <Info></Info>
            <RemoveHunger></RemoveHunger>
            <DonateNow></DonateNow>
        </div>
    );
};

export default Home;