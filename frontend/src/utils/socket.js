import { io } from 'socket.io-client';
import { ENV } from '../config/config';

let socket = null;

const connectSocket = () => {
	if (!socket) {
		const socketInstance = new io(ENV.WEBSOCKET_URL);

		return socketInstance;
	}
};

export default { connectSocket, socket };
