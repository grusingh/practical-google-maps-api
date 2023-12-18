import {useEffect, useRef} from "react";
import {Loader} from "@googlemaps/js-api-loader";

export default function Page() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const center = {lat: 48.8584, lng: 2.2945}; // Eiffel Tower
    const zoom = 12;

    // initialize map
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            version: "weekly",
            libraries: ["places"]
        });

        loader.load().then(async () => {
            const {Map} = await window.google.maps.importLibrary("maps");
            mapRef.current = new Map(mapContainerRef.current, {
                    center,
                    zoom,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID // 'DEMO_MAP_ID',
                }
            );
            initAutocomplete();
        });
    }, []);

    async function initAutocomplete() {
        const {Autocomplete} = await window.google.maps.importLibrary("places");
        const {AdvancedMarkerElement} = await window.google.maps.importLibrary("marker");

        const autocomplete = new Autocomplete(document.getElementById("pac-input"), {
            fields: ["place_id", "geometry", "name"],
            types: ["establishment"],
            componentRestrictions: {country: "fr"},
        });

        // use bounds bias to improve performance
        autocomplete.bindTo("bounds", mapRef.current);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();

            console.log('Event: place_changed', place)
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }

            const {location} = place.geometry;
            mapRef.current.setCenter(location);
            mapRef.current.setZoom(17);

            new AdvancedMarkerElement({
                map: mapRef.current,
                position: location,
            });
        });
    }

    return (
        <main className='h-screen'>
            <div className="flex flex-col">
                <h1 className='text-2xl font-bold'>Places Autocomplete</h1>
                <p className='text-gray-500'>Type-ahead-search input control</p>
                <a className="text-blue-500 hover:text-blue-700"
                   href="https://developers.google.com/maps/documentation/javascript/place-autocomplete">Google Maps Place Autocomplete
                    Documentation</a>
                <a className="text-blue-500 hover:text-blue-700" href="/">Home</a>
            </div>
            <div className="flex flex-row justify-between mt-4 h-2/3">
                <div className="p-4 w-1/3">
                    <h1 className="text-xl font-bold">Place Autocomplete</h1>

                    <div className="flex flex-col">
                        <label htmlFor="query">Autocomplete</label>
                        <input id="pac-input" type="text" />

                    </div>
                </div>
                <div ref={mapContainerRef} className="w-2/3 m-4"/>
            </div>
        </main>
    )
}
