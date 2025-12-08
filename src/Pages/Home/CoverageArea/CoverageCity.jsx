import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for the default Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// 💡 STATIC DATA FOR THE CITY LIST (8 Districts)
const staticDistricts = [
    "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet",
    "Barisal", "Rangpur", "Mymensingh",
];


// --- MAP CONTROLLER ---
const MapController = ({ center, zoom }) => {
    const map = useMap();
    
    useEffect(() => {
        if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
            map.flyTo(center, zoom || 10, {
                duration: 2
            });
        }
    }, [center, map, zoom]);

    return null;
};


const CoverageCity = () => {
    const [cityData, setCityData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [mapFocusCenter, setMapFocusCenter] = useState(null); 
    // 💡 NEW STATE: To store districts that match the partial search term
    const [matchingDistricts, setMatchingDistricts] = useState([]); 

    const defaultPosition = [23.8103, 90.4125]; // Dhaka coordinates

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const response = await fetch('/ShareCity.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCityData(data);
            } catch (error) {
                console.error("Failed to fetch city data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCityData();
    }, []);

    // 💡 REUSABLE FUNCTION to find data and update map focus (now used for exact match or first partial match)
    const findAndFocusDistrict = (term) => {
        const lowerTerm = term.trim().toLowerCase();
        if (!lowerTerm) {
            setMapFocusCenter(defaultPosition);
            setMatchingDistricts([]);
            return;
        }

        // 1. Filter based on partial match
        const matches = cityData.filter(city => 
            city.district && city.district.toLowerCase().includes(lowerTerm)
        );
        
        // 2. Update the displayed list of matching districts
        setMatchingDistricts(matches);

        // 3. Focus the map on the first found match (if any)
        const firstMatch = matches[0];

        if (firstMatch && firstMatch.latitude !== undefined && firstMatch.longitude !== undefined) {
            setMapFocusCenter([firstMatch.latitude, firstMatch.longitude]);
        } else if (matches.length > 0) {
            // If matches exist but coordinates are bad, don't fly, just show list.
            setMapFocusCenter(null); 
        } else {
            // No matches found, reset focus
            setMapFocusCenter(defaultPosition);
            
            // Only alert if the user explicitly submitted a full search term that failed
            if (term === searchTerm && searchTerm.length > 0) {
                 alert(`District starting with "${term}" not found.`);
            }
        }
    };


    // 💡 Logic for Search Input Change
    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        // Call the focus function immediately on change for live filtering
        findAndFocusDistrict(term);
    };

    // 💡 Logic for Search Button Submission (Use this to confirm the search)
    const handleSearch = (e) => {
        e.preventDefault(); 
        findAndFocusDistrict(searchTerm);
    };


    // Determine the map center
    const firstCityWithCoords = cityData.find(city => city.latitude !== undefined && city.longitude !== undefined && !isNaN(city.latitude) && !isNaN(city.longitude));
    
    const initialMapCenter = firstCityWithCoords
        ? [firstCityWithCoords.latitude, firstCityWithCoords.longitude]
        : defaultPosition;
    
    // If mapFocusCenter is explicitly null (e.g., partial match but bad coords), use initial.
    const currentMapCenter = mapFocusCenter === null ? initialMapCenter : mapFocusCenter;


    if (isLoading) {
        return (
            <div className="py-24 text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-lg text-neutral">Loading service coverage data...</p>
            </div>
        );
    }

    if (!cityData || cityData.length === 0) {
        return (
            <div className="py-24 text-center">
                <p className="text-xl text-warning font-bold">Warning: Map data not available, but serving major districts listed below.</p>
            </div>
        );
    }

    return (
        <section className="py-16 md:py-24 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-extrabold text-neutral tracking-tight mb-4">
                    Our Service Coverage Map 📍
                </h2>

                <p className="text-xl text-base-content max-w-3xl mx-auto mb-10 opacity-80">
                    Search by district name to fly the map to the coverage area.
                </p>

                {/* --- Search Input and Button --- */}
                <form onSubmit={handleSearch} className="flex justify-center mb-4">
                    <div className="form-control max-w-md w-full">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Start typing a district (e.g., dhak, rang)..."
                                className="input input-bordered w-full"
                                value={searchTerm}
                                // 💡 Call the new input handler for live filtering
                                onChange={handleInputChange} 
                            />
                            <button type="submit" className="btn btn-secondary">
                                <IoSearchOutline className="w-5 h-5 mr-1" />
                                Search
                            </button>
                        </div>
                    </div>
                </form>
                
                {/* 💡 LIVE SEARCH RESULTS DISPLAY */}
                {searchTerm.length > 0 && matchingDistricts.length > 0 && (
                    <div className="flex justify-center mb-6">
                        <div className="max-w-md w-full text-left p-2 border border-base-300 rounded-lg bg-white shadow-lg">
                            <p className="text-sm font-semibold text-neutral mb-1">
                                Matching Districts ({matchingDistricts.length}):
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {matchingDistricts.map(city => (
                                    <span
                                        key={city.district}
                                        className="badge badge-sm badge-info badge-outline cursor-pointer hover:bg-info hover:text-white transition-colors"
                                        onClick={() => {
                                            setSearchTerm(city.district);
                                            findAndFocusDistrict(city.district);
                                        }}
                                    >
                                        {city.district}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/* 💡 END LIVE SEARCH RESULTS DISPLAY */}


                {/* --- Main Map Container --- */}
                <div
                    className="bg-white rounded-xl shadow-2xl p-4 md:p-8"
                    style={{ height: "700px" }}
                >
                    <MapContainer
                        center={initialMapCenter} 
                        zoom={7}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                        key={cityData.length} 
                    >
                        <MapController center={currentMapCenter} zoom={10} /> 
                        
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {cityData.map((city, index) => {
                            // Validate coordinates before creating a Marker
                            if (city.latitude !== undefined && city.longitude !== undefined && !isNaN(city.latitude) && !isNaN(city.longitude)) {
                                return (
                                    <Marker key={index} position={[city.latitude, city.longitude]}> 
                                        <Popup>
                                            <strong className="text-primary">{city.district || city.name}</strong> <br /> 
                                            We cover this area!
                                        </Popup>
                                    </Marker>
                                );
                            }
                            return null;
                        })}

                    </MapContainer>
                </div>

                {/* --- Supporting Content / City List (Static) --- */}
                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-neutral mb-4">
                        Major Districts We Serve:
                    </h3>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-lg text-primary font-medium">
                        {staticDistricts.map((district) => (
                            <span
                                key={district}
                                className="badge badge-lg badge-outline badge-primary cursor-pointer hover:bg-primary hover:text-white transition-colors"
                                onClick={() => {
                                    setSearchTerm(district); 
                                    findAndFocusDistrict(district); 
                                }}
                            >
                                {district}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoverageCity;