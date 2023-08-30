import { io } from 'socket.io-client';

const url = 'https://matheusaraujo.site';
export const socket = io(url);
