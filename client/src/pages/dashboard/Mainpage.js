import axios from '@utils/Api.js';
import { Chart, registerables } from 'chart.js';
import React, { Suspense, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Code } from 'react-content-loader';
import { useSelector } from 'react-redux';
import SkeletonScreen from '../../components/SkeletonUIs/SkeletonScreen.js';
import DriverPage from './DriverPage.js';

try {
  Chart.register(...registerables);
} catch (error) {}

export const MainPageGraph = () => {
  const myChart = {
    data: {
      labels: [
        'KBS',
        'Royal express',
        'RFTC',
        'Virunga express',
        'Codebandits'
      ],
      datasets: [
        {
          label: 'Number of buses by operator',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      font: {
        family: 'Lexend'
      },
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Lexend',
              weight: 'bolder'
            }
          }
        }
      },
      animation: {
        duration: 3000
      },
      layout: {
        padding: 20
      }
    }
  };

  return (
    <div className="bg-background text-black font-bold font-raleway h-[300px] w-full mb-5">
      <Bar data={myChart.data} options={myChart.options} />
    </div>
  );
};

export const fetchDashboardData = async () => {
  const res = await axios.get('/info');
  console.log(res.data);
  return res.data?.data;
};

export const NotificationPane = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resNotifications = await axios.get('/notifications');
      setNotifications(resNotifications.data);
    };
    fetchData();
  }, []);
  return (
    <div className="shadow-main m-2 rounded-sm px-2 py-1 font-raleway">
      <h1 className="text-center text-2xl font-bold font-raleway">
        Notifications
      </h1>
      <hr />
      {!notifications.length > 0 ? (
        <Code
          height={100}
          width={100}
          uniqueKey="notifications"
          style={{ width: '100%', padding: '1rem' }}
        />
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              className={`bg-${notification.category} bg-opacity-20 rounded-sm border-b py-2 bg-lightest m-1 px-2 flex justify-between`}
              key={notification.id}
            >
              <span>{notification.message}</span>{' '}
              {notification.read ? (
                <span className="cursor-pointer font-bold text-red text-sm">
                  Delete
                </span>
              ) : (
                <span className="cursor-pointer font-bold text-primary text-sm">
                  Mark as read
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const DetailPane = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchInfo = async () => {
      const data = await fetchDashboardData();
      setdata(data);
    };
    fetchInfo();
  }, []);
  return (
    <div className=" w-[99%] z-10 mx-auto h-full md:h-[150px] rounded-md mt-[-5px] px-4 py-2 flex flex-col md:grid md:grid-cols-4 md:gap-3">
      <div className="h-full w-full rounded-md bg-background flex flex-col items-center justify-center shadow-main mb-2">
        {data.buses ? (
          <>
            <h2 className="text-4xl font-semibold font-raleway mb-1">
              {data.buses}
            </h2>
            <p className="text-2xl">Buses</p>
          </>
        ) : (
          <Code
            width={100}
            height={100}
            viewBox="0 0 100 100"
            style={{ width: '100%' }}
            uniqueKey="buses-loader"
          />
        )}
      </div>
      <div className="h-full w-full bg-background flex flex-col items-center justify-center shadow-main mb-2">
        {data.routes ? (
          <>
            <h2 className="text-4xl font-semibold font-raleway mb-1">
              {data.routes}
            </h2>
            <p className="text-2xl">Routes</p>
          </>
        ) : (
          <Code
            width={100}
            height={100}
            viewBox="0 0 100 100"
            style={{ width: '100%' }}
            uniqueKey="routes-loader"
          />
        )}
      </div>
      <div className="h-full w-full bg-background flex flex-col items-center justify-center shadow-main mb-2">
        {data.drivers ? (
          <>
            <h2 className="text-4xl font-semibold font-raleway mb-1">
              {data.drivers}
            </h2>
            <p className="text-2xl">Drivers</p>
          </>
        ) : (
          <Code
            height={100}
            viewBox="0 0 100 100"
            style={{ width: '100%' }}
            uniqueKey="drivers-loader"
          />
        )}
      </div>
      <div className="h-full w-full bg-background flex flex-col items-center justify-center shadow-main mb-2">
        {data.operators ? (
          <>
            <h2 className="text-4xl font-semibold font-raleway mb-1">
              {data.operators}
            </h2>
            <p className="text-2xl">Operators</p>
          </>
        ) : (
          <Code
            height={100}
            viewBox="0 0 100 100"
            style={{ width: '100%' }}
            uniqueKey="operator-loader"
          />
        )}
      </div>
    </div>
  );
};

export const MainPage = () => {
  const { authenticated, user } = useSelector((state) => state?.auth);
  return (
    <div>
      <Suspense fallback={<SkeletonScreen />}>
        <DetailPane />
        {user?.role === 'driver' ? <DriverPage /> : <MainPageGraph />}
      </Suspense>
    </div>
  );
};
export default MainPage;
