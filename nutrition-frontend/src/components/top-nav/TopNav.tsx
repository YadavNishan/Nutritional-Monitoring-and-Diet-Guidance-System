import React from "react";
import Logo from "/logo.svg";
import { useNavigate } from "react-router";

const TopNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto my-5 flex h-10 items-center justify-between text-white">
      <img src={Logo} alt="App Logo" className="h-full object-contain" />
      <button
        className="btn btn-primary w-2/12 font-nunito-sans text-white"
        onClick={() => navigate("/welcome")}
      >
        Let Get Started
      </button>
    </div>
  );
};

export default TopNav;
