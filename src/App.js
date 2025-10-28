import { useEffect, useState, useRef } from "react";
import L from 'leaflet';
import { MapContainer, TileLayer, Polyline,} from 'react-leaflet';
import AnimatedMarker from './components/AnimatedMarker'


import "./App.css"

const vehicleIcon = L.divIcon({
    className: 'car-text',
    html: '<span class="car-img">🚗</span>',
    iconSize: [24, 24]
});

const INITIAL_CENTER = [17.385044, 78.486671];

const App = () => {

    const [routeData, setRouteData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);

    
    useEffect(() => {
        if (isPlaying && routeData.length > 0 && currentIndex < routeData.length - 1) {
            intervalRef.current = setInterval(() => {
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 2000)
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, currentIndex, routeData]);

     const currentPosition = routeData[currentIndex] || routeData[0];


    const togglePlay = () => setIsPlaying(!isPlaying);

    const resetSimulation = () => {
        setIsPlaying(false);
        setCurrentIndex(0);
    };

    useEffect(()=>{
        const loadData = async () =>{

        const response = await fetch('/dummy-route.json');
        const data = await response.json()
    
        const modefiedData = data.map(p => ({
            lat: p.latitude,
            lng: p.longitude,
            timestamp: p.timestamp}))
            
        setRouteData(modefiedData)
        }
        loadData()
    },[])

    const fullRouteCoords = routeData.map(p => [p.lat, p.lng])

    return(
        <>
        <div className="container">
            
                <MapContainer
                    center={INITIAL_CENTER}
                    zoom={15}
                    scrollWheelZoom={true}
                    className="map-container"
                >
                <TileLayer
                    attribution='&copy; <a href="[http://osm.org/copyright](http://osm.org/copyright)">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline
                    pathOptions={{ color: 'gray', weight: 3, opacity: 0.5 }}
                    positions={fullRouteCoords}
                />
                {currentPosition &&
                    <Polyline
                    pathOptions={{ color: 'red', weight: 5, opacity: 0.8 }}
                    positions={routeData.slice(0, currentIndex + 1).map(p => [p.lat, p.lng])}
                    />}
                {currentPosition &&
                    <AnimatedMarker position={[currentPosition.lat, currentPosition.lng]} icon={vehicleIcon} duration={2000}/>
                }
                </MapContainer>
            
            <div>
            <h2 className="">Vehicle Status</h2>
            <div className="">
                <p>Coordinate: <span className="">17.2311</span></p>
                <p>Timestamp:
                    <span className="font-medium text-gray-700">
                        {currentPosition ? new Date(currentPosition.timestamp).toLocaleTimeString() : 'N/A'}
                    </span>
                </p>
                {/* Speed calculation function goes here, returning the formatted speed */}
                <p>Speed: <span className="font-medium text-gray-700">5 km/h</span></p>
            </div>
            <div>
                <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={resetSimulation}>Reset</button>
            </div>
            </div>
        </div>
        </>
    )

}

export default App