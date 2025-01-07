import React from "react";
import WelcomeData from "../../utils/json/welcomeData.json";
import TopNav from "../../components/top-nav/TopNav";
// import HomePageImg1 from "/home-page/home-page-img-1.svg";
// import HomePageImg2 from "/home-page/home-page-img-2.svg";
// import HomePageImg3 from "/home-page/home-page-img-3.svg";
// import HomePageImg4 from "/home-page/home-page-img-4.svg";
// import HomePageImg5 from "/home-page/home-page-img-5.svg";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto">
      <TopNav />
      <div className="flex h-screen flex-col items-center justify-center md:flex-row">
        <div className="w-full px-5 md:w-1/2">
          <h1 className="title !text-start text-primary">
            {WelcomeData.projectDescription.name}
          </h1>
          <p className="subtitle !text-start">
            {WelcomeData.projectDescription.description}
          </p>
        </div>
        <div className="relative h-full w-1/2">
          {/* <img src={HomePageImg1} alt="image 1" className="absolute shadow-lg left-0 top-0" />
          <img src={HomePageImg2} alt="image 1" className="absolute shadow-lg right-0 top-0" />
          <img src={HomePageImg3} alt="image 1" className="absolute shadow-lg left-0 bottom-0" />
          <img src={HomePageImg4} alt="image 1" className="absolute shadow-lg right-0 bottom-0" />
          <img src={HomePageImg5} alt="image 1" className="absolute shadow-lg right-1/2 top-1/2" /> */}
          <img
            src={WelcomeData.projectDescription.logo}
            alt={WelcomeData.projectDescription.name}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
