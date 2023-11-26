import {useEffect, useRef, useState} from "react";
import {Loader} from "@googlemaps/js-api-loader";

export default function Page() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const center = {lat: 48.8584, lng: 2.2945}; // Eiffel Tower
    const zoom = 12;
    const [locationBias, setLocationBias] = useState(true);
    const [query, setQuery] = useState("coffee");
    const [results, setResults] = useState([]);
    const [, setSearchType] = useState("findPlaceFromQuery");

    // initialize map
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            version: "weekly",
        });

        loader.load().then(async () => {
            const {Map} = await window.google.maps.importLibrary("maps");
            mapRef.current = new Map(mapContainerRef.current, {
                    center,
                    zoom,
                    // styles,
                    // disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID // 'DEMO_MAP_ID',
                }
            );
        });
    }, []);

    async function search(searchType) {
        setSearchType(searchType);

        const {AdvancedMarkerElement, PinElement} = await window.google.maps.importLibrary("marker");
        const {InfoWindow} = await window.google.maps.importLibrary("maps");
        const {PlacesService, PlacesServiceStatus} = await window.google.maps.importLibrary("places");
        const infoWindow = new InfoWindow({
            content: "",
        });

        function createMarker({geometry: {location}, name}) {
            const marker = new AdvancedMarkerElement({
                map: mapRef.current,
                position: location,
                content: new PinElement({glyph: name.substring(0, 1)}).element,
            });
            marker.addListener("click", () => {
                infoWindow.setContent(`
                    <div class="flex flex-col">
                        <h1 class="text-xl font-bold">${name}</h1>
                        <p class="text-gray-500">${location.lat()}, ${location.lng()}</p>
                    </div>`);
                infoWindow.open(mapRef.current, marker);
            });
        }

        let request;

        if (searchType === "findPlaceFromQuery") {
            request = {
                query,
                fields: ['name', 'geometry'],
                ...(locationBias ? {
                    locationBias: {
                        center: center,
                        radius: 1000,
                    }
                } : {})
            };
        } else if (searchType === "nearbySearch") {
            request = {
                location: center,
                radius: 1000,
                type: [query],
            };
        } else if (searchType === "textSearch") {
            request = {
                location: center,
                radius: 1000,
                query,
            }
        } else if (searchType === "getDetails") {
            request = {
                placeId: query,
                fields: ['name', 'formatted_address', 'place_id', 'geometry'],
            }
        }

        const service = new PlacesService(mapRef.current);

        service[searchType](request, function (results, status) {
            console.log(searchType, results, status);

            if (status === PlacesServiceStatus.OK) {
                if (searchType === "getDetails") {
                    setResults(results);
                }
                else {
                    setResults(results.map(({
                                                name,
                                                place_id,
                                                geometry: {location}
                                            }) => ({name: `${name} - ${place_id} - (${location.lat()},${location.lng()})`})));

                    for (let i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                    mapRef.current.setCenter(results[0].geometry.location);
                }
            } else {
                setResults([]);
            }
        });
    }


    return (
        <main className='h-screen'>
            <div className="flex flex-col">
                <h1 className='text-2xl font-bold'>Places Library</h1>
                <p className='text-gray-500'>Search for places</p>
                <a className="text-blue-500 hover:text-blue-700"
                   href="https://developers.google.com/maps/documentation/javascript/places#overview">Google Maps Places Library
                    Documentation</a>
                <a className="text-blue-500 hover:text-blue-700" href="/">Home</a>
            </div>
            <div className="flex flex-row justify-between mt-4 h-2/3">
                <div className="p-4 w-1/3">
                    <h1 className="text-xl font-bold">Places Library</h1>

                    <div className="flex flex-col">
                        <label htmlFor="query">Query</label>
                        <input id="query" type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>

                    </div>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="locationBias">Location Bias (to Eiffel Tower)</label>
                        <input id="locationBias" type="checkbox" checked={locationBias}
                               onChange={(e) => setLocationBias(e.target.checked)}/>
                    </div>

                    <div className="flex flex-col mt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                                onClick={() => {
                                    search("findPlaceFromQuery");
                                }}>
                            Find Place From Query
                        </button>
                    </div>
                    <div className="flex flex-col mt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                                onClick={() => {
                                    search("nearbySearch");
                                }}>
                            Nearby Search
                        </button>
                    </div>

                    <div className="flex flex-col mt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                                onClick={() => {
                                    search("textSearch");
                                }}>
                            Text Search
                        </button>
                    </div>

                    <div className="flex flex-col mt-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded"
                                onClick={() => {
                                    search("getDetails");
                                }}>
                            Get Details
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="results">Results</label>
                        <pre className="p-2 bg-gray-200 max-h-96 overflow-auto">
                            <code>{JSON.stringify(results, null, 2)}</code>
                        </pre>
                    </div>

                </div>
                <div ref={mapContainerRef} className="w-2/3 m-4"/>
            </div>
        </main>
    )
}
