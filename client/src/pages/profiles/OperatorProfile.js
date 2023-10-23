import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TableSkeleton from '../../components/SkeletonUIs/TableSkeleton.js';
import { axiosBase } from '../../utils/Api.js';
import Profile from './Profile.js';

const OperatorProfile = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [publicInfo, setPublicInfo] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setloading(true);
      try {
        const response = await axiosBase.get('/accounts/profile');
        if (response.data?.data?.user) {
          setUserInfo(response.data.data.user);
        } else {
          setUserInfo(response.data.data);
        }

        setPublicInfo(response.data.data);
        setloading(false);
      } catch (error) {
        toast('Something went wrong');
        if (error.response.data) {
          const errorData = error.response.data.data;
          Object.keys(errorData).forEach((key) => {
            toast(`${key}: ${errorData[key]}`, { type: 'error' });
          });
          return;
        }
        toast(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <Profile
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          company={publicInfo.company}
          mobileNumber={publicInfo.mobileNumber}
          address={publicInfo.address}
          id={publicInfo.nationalID}
          position={userInfo.role}
          email={userInfo.email}
          image={userInfo.image}
          role={userInfo.role}
        />
      ) : (
        <div>
          <TableSkeleton />
        </div>
      )}
    </div>
  );
};

export default OperatorProfile;
