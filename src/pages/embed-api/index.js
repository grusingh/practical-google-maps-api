import {generateEmbedUrl} from '../../../utils/map-utils'
import {useCallback, useEffect, useState} from "react";

export default function Home() {
    const [width, setWidth] = useState("400");
    const [height, setHeight] = useState("300");
    const [allowFullScreen, setAllowFullScreen] = useState('true');
    const [embedMode, setEmbedMode] = useState("place");
    const [center, setCenter] = useState("51.5007292,-0.1246254");
    const [mapType, setMapType] = useState("roadmap");
    const [zoom, setZoom] = useState("5");
    const [query, setQuery] = useState("Eiffel Tower Paris");
    const [origin, setOrigin] = useState("Oxford University, Oxford");
    const [destination, setDestination] = useState("Eiffel Tower Paris");
    const [waypoints, setWaypoints] = useState("via:Big Ben London");
    const [directionsMode, setDirectionsMode] = useState("driving");
    const [avoid, setAvoid] = useState("tolls");
    const [units, setUnits] = useState("metric");
    const [location, setLocation] = useState("51.5007292,-0.1246254");
    const [pano, setPano] = useState("");
    const [iframeUrl, setIframeUrl] = useState('');

    const handleGenerate = useCallback(() => {
        const embedUrl = generateEmbedUrl({
            embedMode,
            center,
            mapType,
            zoom,
            query,
            origin,
            destination,
            waypoints,
            directionsMode,
            avoid,
            units,
            location,
            pano,
        });

        setIframeUrl(embedUrl);
    }, [center, mapType, zoom, query, origin, destination, waypoints, directionsMode, avoid, units, embedMode, location, pano])

    useEffect(() => {
        handleGenerate();
    }, []);

    return (
        <main className='p-4 grid grid-cols-12 gap-4'>
            <div className="col-span-6">
                <h1 className='text-2xl font-bold'>Embed API</h1>
                <p className='text-gray-500'>Generate interactive map as an iframe</p>
                <a className="text-blue-500 hover:text-blue-700" href="/">Home</a>
                <hr className='my-2'/>
                <div className="flex flex-col space-y-1">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="allowFullScreen" className="text-gray-700 font-medium">Allow Full Screen</label>
                        <select id="allowFullScreen" value={allowFullScreen} onChange={e => setAllowFullScreen(e.target.value)}
                                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    {embedMode !== 'streetview' ? <div className="flex flex-col space-y-1">
                        <label htmlFor="center" className="text-gray-700 font-medium">Center</label>
                        <input id="center" type="text" value={center} onChange={e => setCenter(e.target.value)}
                               className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    </div> : null}

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="mode" className="text-gray-700 font-medium">Mode</label>
                        <select id="mode" value={embedMode} onChange={e => setEmbedMode(e.target.value)}
                                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="place">Place</option>
                            <option value="view">View</option>
                            <option value="directions">Directions</option>
                            <option value="search">Search</option>
                            <option value="streetview">Street View</option>
                        </select>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="mapType" className="text-gray-700 font-medium">Map Type</label>
                        <select id="mapType" value={mapType} onChange={e => setMapType(e.target.value)}
                                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="roadmap">Roadmap</option>
                            <option value="satellite">Satellite</option>
                        </select>
                    </div>

                    <div className="flex justify-between gap-1">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="zoom" className="text-gray-700 font-medium">Zoom</label>
                            <input id="zoom" type="number" value={zoom} onChange={e => setZoom(e.target.value)}
                                   className="w-32 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="width" className="text-gray-700 font-medium">Width</label>
                            <input id="width" type="text" value={width} onChange={e => setWidth(e.target.value)}
                                   className="w-32 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>

                        <div className="flex flex-col Height">
                            <label htmlFor="height" className="text-gray-700 font-medium">Height</label>
                            <input id="height" type="number" value={height} onChange={e => setHeight(e.target.value)}
                                   className="w-32 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>
                    </div>

                    {
                        embedMode === 'place' || embedMode === 'search' ? <div className="flex flex-col space-y-1">
                            <label htmlFor="query" className="text-gray-700 font-medium">Query</label>
                            <input id="query" value={query} onChange={e => setQuery(e.target.value)}
                                   className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div> : null
                    }

                    {
                        embedMode === 'directions' ?
                            <div>
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="origin" className="text-gray-700 font-medium">Origin</label>
                                    <input id="origin" value={origin} onChange={e => setOrigin(e.target.value)}
                                           className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="destination"
                                           className="text-gray-700 font-medium">Destination</label>
                                    <input id="destination" value={destination}
                                           onChange={e => setDestination(e.target.value)}
                                           className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="waypoints" className="text-gray-700 font-medium">Waypoints</label>
                                    <input id="waypoints" value={waypoints} onChange={e => setWaypoints(e.target.value)}
                                           className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="directionsMode" className="text-gray-700 font-medium">Directions
                                        Mode</label>
                                    <select id="directionsMode" value={directionsMode}
                                            onChange={e => setDirectionsMode(e.target.value)}
                                            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="driving">Driving</option>
                                        <option value="walking">Walking</option>
                                        <option value="bicycling">Bicycling</option>
                                    </select>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="avoid" className="text-gray-700 font-medium">Avoid</label>
                                    <input id="avoid" value={avoid} onChange={e => setAvoid(e.target.value)}
                                           className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="units" className="text-gray-700 font-medium">Units</label>
                                    <select id="units" value={units} onChange={e => setUnits(e.target.value)}
                                            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option value="metric">Metric</option>
                                        <option value="imperial">Imperial</option>
                                    </select>
                                </div>
                            </div>
                            : null
                    }

                    {
                        embedMode === 'streetview' ?
                            <div>
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="location" className="text-gray-700 font-medium">Location</label>
                                    <input id="location" value={location} onChange={e => setLocation(e.target.value)}
                                           className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="pano" className="text-gray-700 font-medium">Pano</label>
                                    <input id="pano" value={pano} onChange={e => setPano(e.target.value)}
                                           className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>
                            </div> : null
                    }

                    <div className="flex flex-col space-y-1">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleGenerate}>
                            Generate
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-6 flex flex-col">
                {
                    iframeUrl && <iframe
                        width={width}
                        height={height}
                        style={{border: 0}}
                        loading="lazy"
                        allowFullScreen={allowFullScreen === 'true'}
                        referrerPolicy="no-referrer-when-downgrade"
                        src={iframeUrl}>
                    </iframe>
                }

                <div className="mt-4">
                    <a className="text-blue-500 hover:text-blue-700"
                       href="https://developers.google.com/maps/documentation/embed/embedding-map">Google Maps Embed API
                        Documentation</a>
                </div>
            </div>
        </main>
    )
}
