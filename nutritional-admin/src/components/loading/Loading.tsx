import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-full bg-white">
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    </div>
  );
};

export default Loading;
