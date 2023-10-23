import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer.js';
import { busMovementReducer } from './reducers/busMovementReducer.js';
import { counterReducer } from './reducers/counterReducer.js';
import { dashboardReducer } from './reducers/dashboardReducer.js';
import { managementReducer } from './reducers/managementReducer.js';
import { profileReducer } from './reducers/profileReducer.js';
import { simulateReducer } from './reducers/simulateReducer.js';
import { socketReducer } from './reducers/socketReducer.js';
import { updateProfileReducer } from './reducers/updateProfileReducer.js';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profileUpdates: updateProfileReducer,
    profileInfo: profileReducer,
    auth: authReducer,
    management: managementReducer,
    dashboard: dashboardReducer,
    socket: socketReducer,
    simulate: simulateReducer,
    movement: busMovementReducer
  }
});
