import { io } from 'socket.io-client';
import { base } from './Api.js';

const socket = io(base, {
  cors: true
});

export default socket;
