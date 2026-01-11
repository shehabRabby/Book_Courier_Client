import React from 'react';
import Banner from '../Banner/Banner';
import WhyChoose from '../StaticPart/WhyChoose';
import CuratorsPicks from '../StaticPart/CuratorsPicks';
import StatsAndMilestones from '../StaticPart/StatsAndMilestones';
import FlashSaleCountdown from '../StaticPart/FlashSaleCountdown';
import TopWebsite from '../LibraryBrand/TopWebsite';
import CoverageCity from '../CoverageArea/CoverageCity';
import LatestBook from '../LatestBook/LatestBook';




const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBook></LatestBook>
            <WhyChoose></WhyChoose>
            <FlashSaleCountdown></FlashSaleCountdown>
            <CoverageCity></CoverageCity>
            <CuratorsPicks></CuratorsPicks>
            <TopWebsite></TopWebsite>
           
        </div>
    );
};

export default Home;