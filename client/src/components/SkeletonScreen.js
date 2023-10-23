import React from 'react';

const SkeletonScreen = () => {
  return (
    <div className="flex flex-col animate-pulse">
      <header className="flex border-b-4 flex-row items-center h-full justify-center pb-6">
        <div className=" w-44 xl:w-60 ml-8 xl:ml-20 mt-7 mb-2 bg-gray-300 h-12 rounded-md " />
        <div className="hidden md:flex xl:flex ml-auto mr-20">
          <span className="bg-gray-300 h-12 w-32 rounded-xl mt-7 ml-6 " />
          <span className="rounded-xl w-32 bg-gray-300 h-12 mt-7 ml-6 px-6 " />
          <span className="ml-6 bg-gray-300 h-6 rounded-xl mt-12 px-6 w-24 " />
        </div>
        <div className="w-8 h-6 bg-gray-300 md:hidden xl:hidden ml-auto mr-12 mt-4" />
      </header>
      <main className="flex flex-col items-center lg:flex-row xl:flex-row">
        <section className="flex flex-col items-center">
          <h1>
            <div className="w-64 md:w-96 lg:w-96 xl:w-96 bg-gray-300 h-12 rounded-xl mx-12 xl:mx-28 mt-24 md:mt-32 xl:mt-32" />
          </h1>
          <h2>
            <div className="w-44 md:w-48 lg:w-48 xl:w-48 bg-gray-300 h-12 rounded-xl mx-20 mt-10 " />
          </h2>
          <div className="w-28 md:w-28 lg:w-28 xl:w-28 bg-gray-300 h-10 rounded-3xl mt-12 px-12 xl:px-12 py-2" />
        </section>
        <div className="w-64 md:w-96 lg:w-96 xl:w-96 h-32 mb-8 md:h-48 lg:h-48 xl:h-48 rounded-xl bg-gray-300 px-20 lg:w-80 xl:w-96 lg:ml-auto xl:ml-auto lg:mr-36 xl:mr-36 mt-28" />
      </main>
    </div>
  );
};

export default SkeletonScreen;
