import generateStaticMapURL from '../../../utils/map-utils'
import {useCallback, useEffect, useState} from "react";

export default function Home() {
    const [center, setCenter] = useState("Eiffel Tower,Paris");
    const [mapType, setMapType] = useState("roadmap");
    const [visible, setVisible] = useState("Eiffel Tower,Paris|Jardin des Plantes,Paris");
    const [scale, setScale] = useState("1");
    const [zoom, setZoom] = useState("12");
    const [size, setSize] = useState("480x480");
    const [path, setPath] = useState("color:0x0000ff|weight:5|Eiffel Tower,Paris|Jardin des Plantes,Paris");
    const [markersString, setMarkersString] = useState(
        `color:red|label:E|Eiffel Tower,Paris
color:blue|label:M|Jardin des Plantes,Paris`
    );
    const [imageUrl, setImageUrl] = useState('');

    const handleGenerate = useCallback(() => {
        const staticImageURL = generateStaticMapURL({
            center,
            mapType,
            zoom,
            size,
            scale,
            path,
            visible,
            markers: markersString
                .split("\n")
                .map(marker => marker.trim())
                .filter(marker => marker.length > 0)
        });

        setImageUrl(staticImageURL);
    }, [center, mapType, zoom, size, scale, path, visible, markersString])

    useEffect(() => {
        handleGenerate();
    }, []);

    const imageWidth = size.split("x")[0];
    const imageHeight = size.split("x")[1];

    return (
        <main className='p-4 grid grid-cols-12 gap-4'>
            <div className="col-span-6">
                <h1 className='text-2xl font-bold'>Static Map API</h1>
                <p className='text-gray-500'>Generate static map images with markers</p>
                <a className="text-blue-500 hover:text-blue-700" href="/">Home</a>
                <hr className='my-4'/>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="center" className="text-gray-700 font-medium">Center</label>
                        <input id="center" type="text" value={center} onChange={e => setCenter(e.target.value)}
                               className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="mapType" className="text-gray-700 font-medium">Map Type</label>
                        <select id="mapType" value={mapType} onChange={e => setMapType(e.target.value)}
                                className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="roadmap">Roadmap</option>
                            <option value="satellite">Satellite</option>
                            <option value="terrain">Terrain</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div className="flex justify-between gap-1">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="zoom" className="text-gray-700 font-medium">Zoom</label>
                            <input id="zoom" type="number" value={zoom} onChange={e => setZoom(e.target.value)}
                                   className="w-32 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="size" className="text-gray-700 font-medium">Size</label>
                            <input id="size" type="text" value={size} onChange={e => setSize(e.target.value)}
                                   className="w-32 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <label htmlFor="scale" className="text-gray-700 font-medium">Scale</label>
                            <input id="scale" type="number" value={scale} onChange={e => setScale(e.target.value)}
                                   className="w-32 border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="markers" className="text-gray-700 font-medium">Markers</label>
                        <textarea id="markers" value={markersString} onChange={e => setMarkersString(e.target.value)}
                                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="path" className="text-gray-700 font-medium">Path</label>
                        <input id="path" type="text" value={path} onChange={e => setPath(e.target.value)}
                               className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="visible" className="text-gray-700 font-medium">Visible</label>
                        <input id="visible" type="text" value={visible} onChange={e => setVisible(e.target.value)}
                               className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    </div>

                    <div className="flex flex-col space-y-1">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleGenerate}>
                            Generate
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-6 flex flex-col">
                <img alt="Map" width={imageWidth} height={imageHeight} src={imageUrl}/>

                <div className="mt-4">
                    <h2 className="text-xl font-bold">Things to Try</h2>
                    <a className="text-blue-500 hover:text-blue-700"
                       href="https://developers.google.com/maps/documentation/maps-static/start">Google Static Maps Documentation</a>
                    <ul className="p-4 rounded-md">
                        <li>Center: <b>48.8584, 2.2945</b></li>
                        <li>Different <b>Zoom levels, Map Types and Scale</b></li>
                        <li></li>
                        <li>
                            Clear <b>Center, Zoom, Markers, Path</b> and click the <b>Generate</b> button
                        </li>
                        <li>
                            Change <b>Markers</b> to use image icons<br/>
                            <code className="block bg-gray-100 p-2 m-1">icon:https://goo.gl/1oTJ9Y|Malakoff,Paris</code>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    )
}
