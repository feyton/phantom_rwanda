import CheckRole from '@utils/CheckRoles.js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { setActiveTab } from '../../redux/reducers/managementReducer.js';
import Buses from '../management/Buses.js';
import Companies from '../management/Companies.js';
import Drivers from '../management/Drivers.js';
import Operators from '../management/Operators.js';
import Routes from '../management/Routes.js';

const Management = () => {
  const { tabIndex } = useSelector((state) => state?.management);
  const dispatch = useDispatch();
  const allTabs = [
    { name: 'Drivers', roles: ['operator', 'admin', 'driver'] },
    { name: 'Buses', roles: ['operator', 'admin'] },
    { name: 'Routes', roles: ['admin', 'operator'] },
    { name: 'Companies', roles: ['admin'] },
    { name: 'Operators', roles: ['admin'] }
  ];
  const handleSelect = (index) => {
    dispatch(setActiveTab(index));
  };
  return (
    <main className="overflow-x-auto">
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => handleSelect(index)}
        selectedTabClassName="border-b-2 border-primary h-full mb-0"
      >
        <TabList className="flex border-b-2 mb-5 w-full justify-around shadow-main">
          {allTabs.map((tab) => (
            <CheckRole
              key={tab.name}
              children={
                <Tab
                  className="mr-16 font-bold py-2 w-full px-3 text-center cursor-pointer outline-none focus:outline-none font-raleway"
                  key={tab.name}
                >
                  {tab.name}
                </Tab>
              }
              role={tab.roles}
            />
          ))}
        </TabList>
        <TabPanel>
          <CheckRole
            children={<Drivers />}
            role={['operator', 'admin', 'driver']}
          />
        </TabPanel>

        <TabPanel>
          <CheckRole
            children={<Buses />}
            type="page"
            role={['operator', 'admin']}
          />
        </TabPanel>
        <TabPanel>
          <CheckRole children={<Routes />} role={['admin', 'operator']} />
        </TabPanel>
        <TabPanel>
          <CheckRole children={<Companies />} role={['admin']} />
        </TabPanel>
        <TabPanel>
          {' '}
          <CheckRole children={<Operators />} role={['admin']} />{' '}
        </TabPanel>
      </Tabs>
    </main>
  );
};

export default Management;
