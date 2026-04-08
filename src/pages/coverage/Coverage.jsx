import React, { useRef } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Headings from "../shared/Headings";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.6, 90.3563];
  const centers = useLoaderData();
  const mapRef = useRef(null);
  console.log(centers);

  let timeout;

  const handleSearchLocation = (e) => {
    const value = e.target.value.toLowerCase();

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      const district = centers.find(
        (c) =>
          c.district.toLowerCase().includes(value) ||
          c.city.toLowerCase().includes(value) ||
          c.covered_area.some((area) => area.toLowerCase().includes(value)),
      );

      if (district && mapRef.current) {
        mapRef.current.flyTo([district.latitude, district.longitude], 12);
      }
    }, 400); // 400ms delay
  };
  return (
    <div>
      <div>
        <Headings>Explore Shifto Locations</Headings>
      </div>
      <form onSubmit={handleSearchLocation}>
        <div className="flex items-center max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden border mb-3">
          <input
            type="search"
            placeholder="Search location..."
            className="flex-1 px-4 py-3 outline-none text-gray-700"
            name="location"
            onChange={handleSearchLocation}
          />

          <button className="bg-primary text-white px-5 py-3 hover:opacity-90 transition">
            Search
          </button>
        </div>
      </form>
      <div className="w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {centers.map((center, index) => (
            <Marker position={[center.latitude, center.longitude]} key={index}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Centers:{" "}
                {center.covered_area.join(",")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
