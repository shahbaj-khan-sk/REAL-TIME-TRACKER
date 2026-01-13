import { MapContainer, TileLayer, Marker } from "react-leaflet";

const bounds = [
  [-90, -180], // South-West
  [90, 180],   // North-East
];

const Map = ({ users }) => {
  return (
    <MapContainer
      center={[20, 78]}
      zoom={5}
      minZoom={2}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />

      {users.map((u, i) => (
        <Marker key={i} position={[u.lat, u.lng]} />
      ))}
    </MapContainer>
  );
};

export default Map;
