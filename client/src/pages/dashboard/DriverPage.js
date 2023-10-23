import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  setbusSeats,
  setEntityId,
  setinProgress,
  setPassengers
} from '../../redux/reducers/busMovementReducer.js';
import { axiosBase } from '../../utils/Api.js';
import BusMovement from './BusMovement.js';

export default function DriverPage() {
  const [driverInfo, setdriverInfo] = useState();
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setloading(true);
        const res = await axiosBase.get('/accounts/profile');
        setdriverInfo(res.data.data);
        dispatch(setbusSeats(res.data.data?.bus?.seats));
        dispatch(setinProgress(res.data.data?.inProgress));
        dispatch(setEntityId(res.data.data?.inProgress?.entityId));
        dispatch(setPassengers(res.data.data?.inProgress?.passengers || 0));
      } catch (error) {
        toast(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        ''
      ) : (
        <>
          {driverInfo ? (
            <div className="py-2 px-2 flex flex-col font-bold">
              <h1 className="text-3xl text-center font-raleway">
                BUS MANAGEMENT
              </h1>
              <div className="grid mt-3 grid-cols-3 py-2 gap-2">
                <div className="w-full mt-2 px-2 py-2  rounded-sm mx-auto shadow-main">
                  <h3 className="border-b  text-center font-bold font-raleway">
                    ABOUT ME
                  </h3>
                  <p>
                    Name: {driverInfo.user.firstName} {driverInfo.user.lastName}
                  </p>
                  <p>License: {driverInfo.license}</p>
                  <p>National Id: {driverInfo.nationalID}</p>
                </div>
                <div className="w-full px-2 py-2 mt-2 rounded-sm mx-auto shadow-main">
                  <h3 className="text-center font-bold font-raleway">BUS</h3>
                  <hr />
                  {driverInfo?.bus && (
                    <div>
                      <p>Bus Plate: {driverInfo.bus.plateNumber}</p>
                      <p>Bus Seats: {driverInfo.bus.seats}</p>
                      <p>Bus Type: {driverInfo.bus.busType}</p>
                      <p>
                        Asssigned route:{' '}
                        {driverInfo?.bus?.route?.code || 'None'}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full mt-2  px-2 py-2 rounded-sm mx-auto shadow-main">
                  <h3 className="text-center font-bold font-raleway">
                    ROUTE INFO
                  </h3>
                  <hr />
                  {driverInfo?.bus?.route && (
                    <div>
                      <p>
                        From: <b>{driverInfo.bus.route.origin}</b>
                      </p>
                      <p>
                        To: <b>{driverInfo.bus.route.destination}</b>
                      </p>
                    </div>
                  )}
                  <hr />
                </div>
              </div>
              {driverInfo?.bus?.route ? (
                <BusMovement bus={driverInfo.bus} />
              ) : (
                <div className="w-fit min-w-[300px]  px-2 py-2 rounded-sm mx-auto shadow-main">
                  <h2 className="text-xl font-raleway font-bold">
                    No Bus or Route Assigned
                  </h2>
                  <hr />
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2>Unable to load info</h2>
            </div>
          )}
        </>
      )}
    </>
  );
}
