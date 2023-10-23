import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActive,
  setConnected,
  setDisconnected,
  setSocketError
} from '../redux/reducers/socketReducer.js';
import socket from '../utils/socket.js';
import './socket.css';

function SocketState() {
  let dispatch = useDispatch();
  const { active, connected, error } = useSelector((state) => state?.socket);

  useEffect(() => {
    socket.on('connect', () => {
      dispatch(setConnected());
    });
    socket.on('connect_error', () => {
      dispatch(setSocketError({ message: 'server error' }));
    });
    socket.on('disconnect', (data) => {
      dispatch(setDisconnected());
    });
    socket.on('active_users', (data) => {
      dispatch(setActive(data));
    });
  }, []);
  return (
    <div
      className={
        connected ? 'socket-state connected' : 'socket-state disconnected'
      }
    ></div>
  );
}

export default SocketState;
