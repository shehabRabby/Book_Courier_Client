import React from 'react';
import Banner from '../Banner/Banner';
import WhyChoose from '../StaticPart/WhyChoose';
import CuratorsPicks from '../StaticPart/CuratorsPicks';
import StatsAndMilestones from '../StaticPart/StatsAndMilestones';
import FlashSaleCountdown from '../StaticPart/FlashSaleCountdown';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyChoose></WhyChoose>
            <CuratorsPicks></CuratorsPicks>
            <FlashSaleCountdown></FlashSaleCountdown>
        </div>
    );
};

export default Home;