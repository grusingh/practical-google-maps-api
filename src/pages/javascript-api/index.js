import {useEffect, useRef} from "react";
import {Loader} from "@googlemaps/js-api-loader";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const center = {lat: 48.8584, lng: 2.2945};
    const location1 = {lat: 48.856190, lng: 2.294830};
    const location2 = {lat: 48.855920, lng: 2.298160};
    const location3 = {lat: 48.857490, lng: 2.294990};
    const zoom = 15;

    // initialize map
    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            version: "weekly",
        });

        loader.load().then(async () => {
            const {Map} = await window.google.maps.importLibrary("maps");
            const map = new Map(mapContainerRef.current, {
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

            // show custom control button on top center
            const button = document.createElement('button');
            button.textContent = '😊 Show Marker';
            button.classList.add('pointer', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'text-lg', 'mt-2');
            button.addEventListener('click', showMarker);
            map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(button);

            mapRef.current = map;
        });
    }, []);

    // customize map
    async function showMarker() {
        const {AdvancedMarkerElement, PinElement} = await window.google.maps.importLibrary("marker");

        const infowindow = new window.google.maps.InfoWindow({
            content: `<div class="text-center">
                        <h1 class="text-2xl font-bold">Eiffel Tower</h1>
                        <p class="text-gray-500">Paris, France</p>
                        <img class="w-48 h-48 mt-2" src="//upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/250px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg" alt="Eiffel Tower">
                        <a class="text-blue-500 hover:text-blue-700" href="https://en.wikipedia.org/wiki/Eiffel_Tower">Wikipedia</a>
                    </div>`,
            ariaLabel: "Eiffel Tower",
        });

        // legacy marker
        const legacyMarker = new window.google.maps.Marker({
            map: mapRef.current,
            position: location3,
            title: "Legacy Marker",
            label: 'L',
        });

        legacyMarker.addListener("click", () => {
            infowindow.open(mapRef.current, legacyMarker);
        });

        // basic Advanced marker
        const pinContent = new PinElement({
            glyph: "A",
          });
        new AdvancedMarkerElement({
            map: mapRef.current,
            position: center,
            title: "Advanced Eiffel Tower",
            content: pinContent.element,
        });

        // custom marker with pin
        const pin = new PinElement({
            background: '#fcabf6',
            borderColor: '#ff0000',
            glyphColor: '#ffffff',
            glyph: '🍏',
            scale: 1.5,
        });

        const advMarker = new AdvancedMarkerElement({
            map: mapRef.current,
            position: location1,
            content: pin.element,
        });

        advMarker.addListener("click", () => {
            infowindow.close();
            infowindow.setContent(`<div class="text-center">
                    <h1 class="text-2xl font-bold">Lorem Ipsum</h1>
                    <p class="text-gray-500">
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Duo Reges: constructio interrete. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus.\`);
                    </p>
                </div>`);
            infowindow.open(mapRef.current, advMarker);
        });

        // custom marker with image
        const imageTag = document.createElement('img');
        imageTag.src = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Latte_and_dark_coffee.jpg';
        imageTag.style.width = '70px';
        imageTag.style.height = '70px';
        imageTag.style.borderRadius = '50%';

        new AdvancedMarkerElement({
            map: mapRef.current,
            position: location2,
            content: imageTag,
            title: "My Coffee Place near Eiffel Tower",
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
            <div ref={mapContainerRef} className="w-full h-2/3 mt-4"/>
            <div className="p-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={showMarker}>
                    Show Marker
                </button>
            </div>
        </main>
    )
}
