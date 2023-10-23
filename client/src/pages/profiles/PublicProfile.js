import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import stars from '../../assets/stars.png';
import { axiosBase } from '../../utils/Api.js';

const PublicProfile = () => {
  const [driver, setDriver] = useState();
  const { id } = useParams();
  useEffect(() => {
    const getDriver = async () => {
      try {
        const res = await axiosBase.get('/drivers/public-profile/' + id);
        setDriver(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDriver();
  }, []);
  return (
    <div className="mx-auto items-center w-full h-full p-8 pt-0 top-8 right-2 mb-12">
      <div className="bg-white rounded-xl shadow-xl z-10">
        {driver && (
          <>
            <div className="bg-gray-200 pb-4">
              <div className="pt-10 pb-6">
                <img
                  src={driver.user?.image}
                  alt="bus"
                  className="rounded-full object-cover w-40 h-40 border-8 border-gray-300 mx-auto"
                />
              </div>
              <div className="h-20 flex flex-col items-center">
                <h1 className="font-black font-raleway  md:text-3xl lg:text-3xl xl:text-3xl text-3xl">
                  {`${driver.user.firstName} ${driver.user.lastName}`}
                </h1>
                <h2 className="font-bold mt-4 font-raleway  md:text-base lg:text-base xl:text-base text-base">
                  Bus Driver
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-center py-8 md:py-4">
              <img src={stars} alt="stars" className="w-30 h-8 mt-6 mb-8" />
              <div className="flex flex-col md:w-full md:text-sm lg:text-base md:flex-row md:justify-center mt-4">
                <div className="pb-2 md:pb-0 md:pr-12 lg:pr-20 border-gray-400 border-b md:border-b-0 md:border-r mb-4">
                  <h1 className="font-bold pb-2">Company</h1>
                  <p>{driver?.bus?.company}</p>
                </div>
                <div className="py-2 md:py-0 md:px-12 lg:px-20 border-gray-400 border-b md:border-b-0 md:border-r mb-4">
                  <h1 className="font-bold pb-2">Bus</h1>
                  <p>{driver?.bus?.plateNumber}</p>
                </div>
                <div className="py-2 md:py-0 md:px-12 lg:px-20 border-gray-400 border-b md:border-b-0 md:border-r mb-4">
                  <h1 className="font-bold pb-2">Road</h1>
                  <p>{`${driver?.bus?.route?.origin} to ${driver?.bus?.route?.destination}`}</p>
                </div>
                <div className="pt-2 md:pt-0 md:pl-12 lg:pl-20">
                  <h1 className="font-bold pb-2">Email</h1>
                  <p>{driver?.user?.email}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
