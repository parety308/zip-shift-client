import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
const Coverage = () => {
    const position = [23.6850, 90.3563];
    const serviceCenters = useLoaderData();
    const mapRef=useRef(null);
    // console.log(serviceCenters);
    const handleSearch = (event) => {
        event.preventDefault();
        const location = event.target.location.value;
        const district = serviceCenters.find(center => center.district.toLowerCase().includes(location.toLowerCase()));

        if (district) {
            const coords = [district.latitude, district.longitude];
            mapRef.current.flyTo(coords,14);
            console.log(coords);
        }
        // console.log(location);
    };
    return (
        <div className='my-15'>
            <h1 className="text-5xl my-10 font-bold text-center"> We are available in 64 districs</h1>
            <div>
                <form onSubmit={handleSearch} className='mb-2'>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" name='location' className="grow" placeholder="Search Area" />
                    </label>
                </form>
            </div>
            {/*  */}
            <div className='w-full h-[800px] border'>
                <MapContainer
                    center={position}
                    zoom={8}
                    scrollWheelZoom={false}
                    className='h-[800px]'
                    ref={mapRef}

                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {serviceCenters.map((center,index) => (
                        <Marker
                            position={[center.latitude, center.longitude]}
                            key={index}
                            >
                            <Popup>
                                <strong>{center.district}</strong> <br />
                                Servie Area : {center.covered_area.join(', ')}.

                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;