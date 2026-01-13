import { useEffect, useState } from "react";
import socket from "./socket";
import Map from "./Map";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        socket.emit("sendLocation", {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }

    socket.on("receiveLocation", (data) => {
      setUsers(data);
    });

    return () => socket.off("receiveLocation");
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Real Time Tracker</h1>
      <Map users={users} />
    </div>
  );
}

export default App;
