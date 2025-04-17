import { io } from "socket.io-client";

export const initSocket = async () => {
  const option = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000, // 10 seconds
    transports: ["websocket"],
  };
  return io(import.meta.env.VITE_APP_URL, option);
};
