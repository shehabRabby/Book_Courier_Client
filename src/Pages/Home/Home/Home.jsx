import React from 'react';
import Banner from '../Banner/Banner';
import WhyChoose from '../StaticPart/WhyChoose';
import CuratorsPicks from '../StaticPart/CuratorsPicks';
import StatsAndMilestones from '../StaticPart/StatsAndMilestones';
import FlashSaleCountdown from '../StaticPart/FlashSaleCountdown';
import TopWebsite from '../LibraryBrand/TopWebsite';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChoose></WhyChoose>
            <FlashSaleCountdown></FlashSaleCountdown>
            <CuratorsPicks></CuratorsPicks>
            <TopWebsite></TopWebsite>
           
        </div>
    );
};

export default Home;