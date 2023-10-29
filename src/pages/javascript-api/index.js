import {useEffect, useRef, useState} from "react";
import {Loader} from "@googlemaps/js-api-loader"
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const center = {lat: 48.8584, lng: 2.2945};
    const zoom = 15;

    // initialize map
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            version: "weekly",
        });

        loader.load().then(async () => {
            const {Map} = await window.google.maps.importLibrary("maps");
            const map = new Map(mapRef.current, {
                    center,
                    zoom,
                    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID // 'DEMO_MAP_ID',
                }
            );
            setMap(map);
        });
    }, []);

    // customize map
    async function showMarker() {
        const {AdvancedMarkerElement} = await window.google.maps.importLibrary("marker");

        const marker = new AdvancedMarkerElement({
            map: map,
            position: center,
            title: "Eiffel Tower",
        });
    }

    return (
        <main className='h-screen'>
            <div className="flex flex-col">
                <h1 className='text-2xl font-bold'>JavaScript API</h1>
                <p className='text-gray-500'>Generate fully interactive dynamic maps</p>
                <a className="text-blue-500 hover:text-blue-700"
                   href="https://developers.google.com/maps/documentation/javascript">Google Maps JavaScript API
                    Documentation</a>
                <a className="text-blue-500 hover:text-blue-700" href="/">Home</a>
            </div>
            <div ref={mapRef} className="w-full h-2/3 mt-4"/>
            <div className="p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showMarker}>
                    Show Marker
                </button>
            </div>
        </main>
    )
}
