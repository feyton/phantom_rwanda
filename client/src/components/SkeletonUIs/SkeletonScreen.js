import React from 'react';

const SkeletonScreen = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <header className="flex border-b-4 flex-row items-center h-full justify-center pb-6">
        <div className=" w-44 xl:w-60 ml-8 xl:ml-20 mt-7 mb-2 bg-gray-300 h-12 rounded-md " />
        <div className="hidden md:flex xl:flex ml-auto mr-20">
          <span className="bg-gray-300 h-12 w-32 rounded-xl mt-7 ml-6 " />
          <span className="rounded-xl w-32 bg-gray-300 h-12 mt-7 ml-6 px-6 " />
          <span className="ml-6 bg-gray-300 h-10 mt-8 px-6 w-28 " />
        </div>
        <div className="w-8 h-6 bg-gray-300 md:hidden xl:hidden ml-auto mr-12 mt-4" />
      </header>
    </div>
  );
};

export default SkeletonScreen;
