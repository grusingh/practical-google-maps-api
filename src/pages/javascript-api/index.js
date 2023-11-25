import {useEffect, useRef} from "react";
import {Loader} from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const locationsNearEiffelTower = [
    {lat: 48.8584, lng: 2.2945}, // Eiffel Tower
    {lat: 48.8606, lng: 2.3376}, // Louvre Museum
    {lat: 48.8529, lng: 2.3508}, // Notre-Dame de Paris
    {lat: 48.8635, lng: 2.2875}, // Arc de Triomphe
    {lat: 48.8600, lng: 2.3275}, // Tuileries Garden
    {lat: 48.8566, lng: 2.3522}, // Centre Pompidou
    {lat: 48.8611, lng: 2.2969}, // Quai Branly Museum
    {lat: 48.8601, lng: 2.3126}, // Place de la Concorde
    {lat: 48.8718, lng: 2.3088}, // Palais de Tokyo
    {lat: 48.8625, lng: 2.2879}, // Trocadéro Gardens
];

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
            const buttonMarker = document.createElement('button');
            buttonMarker.textContent = '😊 Show Marker';
            buttonMarker.classList.add('pointer', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'text-lg', 'mt-2', 'mr-2');
            buttonMarker.addEventListener('click', showMarker);

            const buttonCluster = document.createElement('button');
            buttonCluster.textContent = '😊 Show Cluster';
            buttonCluster.classList.add('pointer', 'bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'rounded', 'text-lg', 'mt-2');
            buttonCluster.addEventListener('click', showCluster);

            map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(buttonMarker);
            map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(buttonCluster);
            mapRef.current = map;
        });
    }, []);

    // customize map
    async function showCluster() {
        const { InfoWindow } = await window.google.maps.importLibrary("maps");
        const {AdvancedMarkerElement, PinElement} = await window.google.maps.importLibrary("marker");
        const infoWindow = new InfoWindow({
            content: "",
        });

        const markers = locationsNearEiffelTower.map((position, i) => {
            const label = `${i + 1}`;
            const pinGlyph = new PinElement({
                glyph: label,
                glyphColor: "white",
            });
            const marker = new AdvancedMarkerElement({
                position,
                content: pinGlyph.element,
            });

            marker.addListener("click", () => {
                infoWindow.setContent(position.lat + ", " + position.lng);
                infoWindow.open(mapRef.current, marker);
            });

            return marker;
        });

        mapRef.current.setZoom(11);
        new MarkerClusterer({ markers, map: mapRef.current });
    }

    async function showShapes() {
        const {AdvancedMarkerElement, PinElement} = await window.google.maps.importLibrary("marker");
        const { Circle, Rectangle } = await window.google.maps.importLibrary("maps");

        new AdvancedMarkerElement({
            map: mapRef.current,
            position: locationsNearEiffelTower[0],
            content: new PinElement({glyph: "1"}).element,
        });
        new Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.20,
            map: mapRef.current,
            center: locationsNearEiffelTower[0],
            radius: 150,
        });

        new AdvancedMarkerElement({
            map: mapRef.current,
            position: locationsNearEiffelTower[3],
            content: new PinElement({glyph: "2"}).element,
        });
        const bounds = {
            north: locationsNearEiffelTower[3].lat + 0.002,
            south: locationsNearEiffelTower[3].lat - 0.002,
            east: locationsNearEiffelTower[3].lng + 0.003,
            west: locationsNearEiffelTower[3].lng - 0.003
        };
        new Rectangle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.4,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.20,
            map: mapRef.current,
            bounds,
        });
    }

    async function showMarker() {
        const {AdvancedMarkerElement, PinElement} = await window.google.maps.importLibrary("marker");

        const infoWindow = new window.google.maps.InfoWindow({
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
            infoWindow.open(mapRef.current, legacyMarker);
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
            infoWindow.close();
            infoWindow.setContent(`<div class="text-center">
                    <h1 class="text-2xl font-bold">Lorem Ipsum</h1>
                    <p class="text-gray-500">
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Duo Reges: constructio interrete. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus. Quae cum dixisset paulumque institisset, Quid est? Quae cum essent dicta, discessimus.\`);
                    </p>
                </div>`);
            infoWindow.open(mapRef.current, advMarker);
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
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                        onClick={showMarker}>
                    Show Marker
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                        onClick={showCluster}>
                    Show Cluster
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={showShapes}>
                    Show Shapes
                </button>
            </div>
        </main>
    )
}
