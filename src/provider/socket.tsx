"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface ISocketContext {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connect = () => {
    if (SocketUrl === undefined) {
      console.log("Socket URL is undefined");
      return;
    }

    if (socket) {
      console.log("Socket already connected", socket);
    } else {
      console.log("Connecting to socket", SocketUrl);
      const socketInstance = io(SocketUrl, {
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      socketInstance
        .on("connect", () => {
          console.log("SOCKET CONNECTED!", socketInstance.id);
          setSocket(socketInstance);
        })
        .on("disconnect", () => {
          console.log("SOCKET DISCONNECTED!");
          setSocket(null);
        });
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    } else {
      console.log("Socket not connected");
    }
  };

  useEffect(() => {
    // connect(); // Automatically connect when the component using the context mounts
    return () => {
      // Disconnect when the component unmounts
      disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

// // ** listen for  event
// React.useEffect(() => {
//     if (!socket) return;

//     socket.on("event_name", (data: any) => {
//       console.log("event_name", data);
//     });

//     return () => {
//       socket.off("event_name");
//     };
//   });
