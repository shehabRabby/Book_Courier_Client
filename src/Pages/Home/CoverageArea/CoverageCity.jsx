import React, { useState, useEffect } from "react";
import { IoSearchOutline, IoLocationSharp } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Leaflet Marker Icon Fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const staticDistricts = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];

// --- MAP CONTROLLER ---
const MapController = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom || 11, { duration: 1.5, easeLinearity: 0.25 });
        }
    }, [center, map, zoom]);
    return null;
};

const CoverageCity = () => {
    const [cityData, setCityData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [mapFocusCenter, setMapFocusCenter] = useState(null); 
    const [matchingDistricts, setMatchingDistricts] = useState([]); 
    const accentColor = "#4f46e5"; // Brand Pink
    const defaultPosition = [23.8103, 90.4125];

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await fetch('/ShareCity.json');
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error("Map Data Error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCityData();
    }, []);

    const findAndFocusDistrict = (term) => {
        const lowerTerm = term.trim().toLowerCase();
        if (!lowerTerm) {
            setMapFocusCenter(defaultPosition);
            setMatchingDistricts([]);
            return;
        }

        const matches = cityData.filter(city => 
            city.district?.toLowerCase().includes(lowerTerm)
        );
        
        setMatchingDistricts(matches);

        if (matches.length > 0) {
            const firstMatch = matches[0];
            if (firstMatch.latitude && firstMatch.longitude) {
                setMapFocusCenter([firstMatch.latitude, firstMatch.longitude]);
            }
        }
    };

    if (isLoading) return (
        <div className="h-96 flex flex-col items-center justify-center bg-base-100">
            <span className="loading loading-ring loading-lg" style={{ color: accentColor }}></span>
            <p className="mt-4 font-bold opacity-50 uppercase tracking-widest text-xs">Initializing Satellite Data</p>
        </div>
    );

    return (
        <section className="py-12  min-h-screen">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-primary flex items-center justify-center gap-3">
                        <IoLocationSharp style={{ color: accentColor }} />
                        Service Coverage
                    </h2>
                    <p className="opacity-60 mt-2">Connecting readers across {cityData.length} active zones</p>
                </div>

                {/* Search & Map Card */}
                <div className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-300">
                    <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
                        
                        {/* Sidebar: Search & Results */}
                        
                        <div className="p-6 lg:border-r border-base-300 bg-base-100 flex flex-col gap-6">
                            <div>
                                <label className="label font-bold text-xs uppercase opacity-50">Search District</label>
                                <div className="join w-full shadow-sm">
                                    <input
                                        type="text"
                                        placeholder="e.g. Dhaka..."
                                        className="input input-bordered join-item w-full focus:outline-none"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            findAndFocusDistrict(e.target.value);
                                        }}
                                    />
                                    <button className="btn btn-neutral join-item">
                                        <IoSearchOutline className="text-xl" />
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic Results List */}
                            <div className="flex-grow overflow-y-auto max-h-[400px]">
                                <label className="label font-bold text-xs uppercase opacity-50 mb-2">
                                    {searchTerm ? 'Search Results' : 'Quick Access'}
                                </label>
                                <div className="flex flex-col gap-2">
                                    {(searchTerm ? matchingDistricts : cityData.slice(0, 8)).map((city) => (
                                        <button
                                            key={city.district}
                                            onClick={() => {
                                                setSearchTerm(city.district);
                                                setMapFocusCenter([city.latitude, city.longitude]);
                                            }}
                                            className="btn btn-ghost btn-sm justify-start hover:bg-base-200 normal-case font-medium"
                                        >
                                            <IoLocationSharp style={{ color: accentColor }} />
                                            {city.district}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Map View */}
                        <div className="lg:col-span-3 h-[600px] lg:h-[600px] relative">
                            <MapContainer
                                center={defaultPosition} 
                                zoom={7}
                                scrollWheelZoom={true}
                                className="h-full w-full z-10"
                            >
                                <MapController center={mapFocusCenter} zoom={12} /> 
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {cityData.map((city, idx) => (
                                    city.latitude && (
                                        <Marker key={idx} position={[city.latitude, city.longitude]}> 
                                            <Popup>
                                                <div className="p-1">
                                                    <h3 className="font-bold text-lg" style={{ color: accentColor }}>{city.district}</h3>
                                                    <p className="text-xs opacity-70">Active Library Node</p>
                                                    <div className="divider my-1"></div>
                                                    <button className="btn btn-xs btn-outline w-full mt-1">View Local Books</button>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )
                                ))}
                            </MapContainer>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {staticDistricts.map((d) => (
                        <div 
                            key={d} 
                            onClick={() => findAndFocusDistrict(d)}
                            className="bg-base-100 p-4 rounded-2xl border border-base-300 hover:border-primary cursor-pointer transition-all text-center group"
                        >
                            <span className="text-sm font-bold group-hover:text-primary transition-colors">{d}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoverageCity;